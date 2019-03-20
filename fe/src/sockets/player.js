function subscribeToPlayerEvents(self, socket, cb) {
	console.log('SUBSCRIBING TO PLAYER')
	socket.on('success-joining-room', successJoiningRoom.bind(this, self))
	socket.on('error-joining-room', errorJoiningRoom.bind(this, socket))
	socket.on('room-full', roomFull.bind(this, self, socket))
	socket.on('host-quit', hostQuit.bind(this, self, socket))
	socket.on('chosen-game', chosenGame.bind(this, self, socket))
}

//sent to socket
function chooseGame(data, socket){
	console.log(data, socket.emit)
	emit('choose-game', data, socket)
}

//recieved from socket
function chosenGame(self, socket, data){
	console.log(data)
	self.props.push('m/' + data)
}

function joinRoom(data, self, socket){
	data.id = socket.id
	emit('player-join-room', data, socket)
}

function successJoiningRoom(self, data, info){
	// self.props.setPlayerRoom(data.result)
	// self.props.setPlayerNumber(data.playerNumber)
	self.props.setPlayerData(data)
	self.props.push('m/home')
}

function errorJoiningRoom(){

}

function roomFull(self){
	self.props.push('pingp/full')
}

function hostQuit(self){
	self.props.push('pingp/not-found')
}

function emit(action, data, socket){
	socket.emit(action, data)
}

export { 
	chooseGame,
	subscribeToPlayerEvents,
	joinRoom,

};