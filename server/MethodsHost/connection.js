const Rooms = require('../models/rooms')
const constants = require('../constants')


exports.hostConnected = function(socket){
	function createCode(){
		console.log('creating code')
		var possible = "ABCDEFGHIJKLMNPQRSTUVWXYZ";
		var text = '';
		for (var i = 0; i < 4; i++){
    		text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return text;
	}
	function createUniqueRoomId(){
		let room = createCode()
		Rooms.findOne({short: room}, function(err, result){
			if (result) return createUniqueRoomId()
			storeRoom(room)
		})
	}
	let playerArr = []
	for (var i = 0; i < constants.playerLimit; i++){
		playerArr.push(false)
	}
	function storeRoom(room){
		console.log('storing room', room)
		Rooms.create({short: room, long: socket.id, players:playerArr}, ()=> {
			socket.emit('room-code-generated', room)
		})
	}
	createUniqueRoomId()
}

exports.startRound = function(socket){
	console.log('starting round')
	socket.to(socket.id).emit('start-round');
}

exports.powerUpGained = function(socket, data){
	console.log('power up gained', data.playerData.id)
	socket.to(data.playerData.id).emit('power-up-gained', data.playerNumber);
}


exports.gameOver = function(socket, data){
	// console.log('starting round')
	console.log('SENDING GAME OVER ')
	socket.to(socket.id).emit('game-over', data);
}

exports.quizShowQuestion = function(socket, data){
	console.log('showing question to player', data)
	socket.to(socket.id).emit('quiz-show-question-player', data);
}

exports.quizSendPlayersToWaiting = function(socket, data){
	socket.to(socket.id).emit('quiz-send-to-waiting', data);
}

