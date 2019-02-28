//app setup
var cors = require('cors')
var express = require('express')
var app = express()
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);
const mongoose = require('mongoose')
require('dotenv').config({path: '.env'})
const bodyParser = require('body-parser')
app.use(cors())
var PORT = process.env.PORT || 9000
const Rooms = require('./models/rooms')
app.use( bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}))
app.use(express.static('build'));
// set up database connection


mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL);
mongoose.connection.on('error', function() {
    console.info('Error: Could not connect to MongoDB.?')
});

mongoose.connection.on('connected', function() {
    console.info('Successfully connected to the database')
});

const PlayerConnection = require('./MethodsPlayer/connection')
const HostConnection = require('./MethodsHost/connection')
//event handlers
io.on('connection', function(socket){  
  // socket.on('test', test.bind(this, socket));
  socket.on('disconnect', disconnect.bind(this, socket));
  socket.on('host-connected', HostConnection.hostConnected.bind(this, socket))
  socket.on('device-orientation', PlayerConnection.deviceOrientation.bind(this, socket))
  // socket.on('player-join-room', PlayerConnection.playerJoinRoom.bind(this, socket))
  socket.on('player-join-room', checkRoomNumbers.bind(this, socket))
  // socket.on('start-round', HostConnection.startRound.bind(this, socket))
  socket.on('start-game', PlayerConnection.startGame.bind(this, socket))
  socket.on('player-buzz', PlayerConnection.playerBuzz.bind(this, socket))
  socket.on('quit-game-player', PlayerConnection.quitGame.bind(this, socket))
  socket.on('game-over', HostConnection.gameOver.bind(this, socket))
  socket.on('restart-game', PlayerConnection.restartGame.bind(this, socket))
});


function checkRoomNumbers(socket, playerData){
	Rooms.findOne({short: playerData.room}, function(err, result){
		if (err){
			console.log('error finding room')
			return socket.emit('error-joining-room')
		} else if (result) {

			const numberInRoom = io.sockets.adapter.rooms[result.long] ? io.sockets.adapter.rooms[result.long].length : 0
			console.log('number in room', )
			if (numberInRoom <= 2){
				console.log('number in room < 2')
				socket.join(result.long)	
				// playerData
				socket.broadcast.to(result.long).emit('player-joined', playerData);
				result.player = playerData
				result.playerNumber = numberInRoom
				let obj = {
					result: result,
					playerNumber: numberInRoom == 1 ? 1 : 2
				}
				socket.emit('success-joining-room', obj)
			} else {
				console.log('number in room GT 2')
				socket.emit('room-full')
			}
		} else {
			console.log('error joining room')
			return socket.emit('error-joining-room')
		}
	})
}


function disconnect(socket){
	let rooms = socket.rooms

	//handle host disconnect
	Rooms.findOne({long: socket.id}, function(err, room){
		socket.broadcast.to(socket.id).emit('host-quit');
		socket.emit('quit-game-player');
		console.log('deleting the room')
		if (room) return room.remove()
	})
}


http.listen(PORT, function(err){
	if (err){
		console.log(err)
		return
	} else {
		console.log('listening one', PORT);
	}
});


app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});