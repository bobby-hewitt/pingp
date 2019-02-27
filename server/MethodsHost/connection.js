const Rooms = require('../models/rooms')

exports.hostConnected = function(socket){

	function createCode(){
		var possible = "ABCDEFGHIJKLMNPQRSTUVWXYZ";
		var text = '';
		for (var i = 0; i < 4; i++){
    		text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		
		return text;
	}

	function createUniqueRoomId(){
		// let room = Math.random().toString(11, 36).substr(2, 4).toUpperCase();
		let room = createCode()
		Rooms.findOne({short: room}, function(err, result){
			if (result) return createUniqueRoomId()
			storeRoom(room)
		})
	}
	function storeRoom(room){
		console.log('storing room', room)
		Rooms.create({short: room, long: socket.id}, ()=> {
			socket.emit('room-code-generated', room)
		})
		
	}
	createUniqueRoomId()
}

exports.startRound = function(socket){
	console.log('starting round')
	socket.to(socket.id).emit('start-round');
}

