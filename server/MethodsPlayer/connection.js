const Rooms = require('../models/rooms')
// console.log(Rooms)

exports.playerJoinRoom = function(socket, playerData){
	console.dir(playerData.room.short)
	console.log('PLAYER JOINED THE ROOM')
	Rooms.findOne({short: playerData.room}, function(err, result){
		if (err){
				
			return socket.emit('error-joining-room')
		} else if (result) {

			socket.join(result.long)
			console.log('CLIETNS')
			socket.broadcast.to(result.long).emit('player-joined', playerData);
			result.player = playerData
			socket.emit('success-joining-room', result)
		} else {
			console.log('no result')
			return socket.emit('error-joining-room')
		}
	})
}

exports.startGame = function(socket, data){
	console.log('STARTING GAME')
	// socket.to(socket.id).emit('start-game');
	socket.to(data).emit('start-game');
}

exports.restartGame = function(socket, data){
	// console.log('STARTING GAME')
	// socket.to(socket.id).emit('start-game');
	socket.to(data).emit('restart-game');
}

exports.quitGame = function(socket, data){
	console.log('STARTING GAME')
	// socket.to(socket.id).emit('start-game');
	socket.to(data).emit('quit-game-player');
}

exports.playerBuzz = function(socket, data){
	// console.log('playerBuzz', data)
	socket.to(data.room).emit('player-responded', data);
}

exports.deviceOrientation = function(socket, data){
	// console.log('recieving data', data)
	socket.to(data.room).emit('device-orientation-sending', data)
}