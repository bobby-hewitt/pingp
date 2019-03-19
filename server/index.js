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
const constants = require('./constants')
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
  socket.on('power-up-gained', HostConnection.powerUpGained.bind(this, socket))
  socket.on('power-up-used', PlayerConnection.powerUpUsed.bind(this, socket))
  // socket.on('player-join-room', PlayerConnection.playerJoinRoom.bind(this, socket))
  socket.on('player-join-room', checkRoomNumbers.bind(this, socket))
  // socket.on('start-round', HostConnection.startRound.bind(this, socket))
  socket.on('start-game', PlayerConnection.startGame.bind(this, socket))
  socket.on('player-buzz', PlayerConnection.playerBuzz.bind(this, socket))
  socket.on('quit-game-player', PlayerConnection.quitGame.bind(this, socket))
  socket.on('game-over', HostConnection.gameOver.bind(this, socket))
  socket.on('restart-game', PlayerConnection.restartGame.bind(this, socket))
});


//FUNCTIONS HERE HANDLE PLAYER CONNECTION AND DISCONNECTION
//host connection is handled in host file.

function getNumberOfTruthies(array){
	let count = 0
	for (var i = 0; i < array.length; i++){
		if(array[i]) count += 1
	}
	return count
}



function checkRoomNumbers(socket, playerData){
	Rooms.findOne({short: playerData.room}, function(err, result){
		if (err){
			console.log('error finding room')
			return socket.emit('error-joining-room')
		} else if (result) {

			const numberOfPlayers = getNumberOfTruthies(result.players.length)
			if (numberOfPlayers < constants.playerLimit){
				//join the room 
				socket.join(result.long)	
				//update the players in the room in DB
				let newArray = []
				let hasGoneIn = false
				let playerNumber = null
				for (var i = 0; i < result.players.length; i++){
					if (result.players[i] || hasGoneIn){
						newArray.push(result.players[i])
					} else {
						playerNumber = i + 1
						newArray.push({
							id: socket.id,
							name: playerData.name
						})
						hasGoneIn = true
					} 
				}

				result.players = newArray
				console.log(result.players)
				result.save(sendResultToPlayer)
				playerData.playerNumber = playerNumber
				playerData.room = result.long

				function sendResultToPlayer(){
					console.log('sending to player')
					socket.broadcast.to(result.long).emit('update-players', result.players);
					let obj = {
						result: result,
						playerNumber: playerNumber,
						playerData: playerData
					}
					socket.emit('success-joining-room', obj)
				}	
			} else {
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
		if (room) {
			socket.broadcast.to(socket.id).emit('host-quit');
			return room.remove()
		} else {
			removePlayer(socket)
		}
	})
}

function removePlayer(socket){
	Rooms.findOne({players: socket.id}, function(err, room){
		console.log('room', room)
		if (room) {
			let newArray = []
			for (var i = 0; i < room.players.length; i++){
				if (room.players[i] === socket.id){
					newArray.push(false)
				} else {
					newArray.push(room.players[i])
				}
			}
			room.players = newArray
			room.save()
			socket.broadcast.to(room.long).emit('update-players', room.players);
		} 
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


// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
// });