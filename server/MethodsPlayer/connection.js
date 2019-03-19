const Rooms = require('../models/rooms')
// console.log(Rooms)

exports.startGame = function(socket, data){
	console.log('STARTING GAME')
	// socket.to(socket.id).emit('start-game');
	socket.to(data).emit('start-game');
}

exports.powerUpUsed = function(socket, data){
	// console.log('POWER UP USED', data.room)
	socket.to(data.room.long).emit('power-up-used', data)
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
	console.log('recieving data', data)
	socket.to(data.room).emit('device-orientation-sending', data)
}