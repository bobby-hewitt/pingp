function subscribeToHostEvents(self, socket, cb) {
	console.log('SUBSCRIBING TO HOST')
	socket.emit('host-connected');
	socket.on('room-code-generated', roomCodeGenerated.bind(this, cb))
  	socket.on('update-players', updatePlayers.bind(this, cb))
	socket.on('chosen-game', chosenGame.bind(this, self, socket))
}


function chosenGame(self, nothing, data){
	console.log(data)
	self.props.push('h/' + data)
}

function roomCodeGenerated(cb, data){
	cb('setRoomCode', data)
}

function updatePlayers(cb, data){
	console.log('updateing players', data)
	cb('updatePlayers', data)
}

export { 
	subscribeToHostEvents,
};