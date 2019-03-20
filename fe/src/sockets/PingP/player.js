function subscribeToPlayerEvents(self, socket, cb) {
	console.log('SUBSCRIBING TO PLAYER PINGP')
	socket.on('start-game', gameStarted.bind(this, self, socket))
	socket.on('restart-game', restartGame.bind(this, cb, socket))
	socket.on('game-over', gameOver.bind(this, self, socket))
	socket.on('quit-game-player', quitGamePlayer.bind(this, self))
}

function unsubscribeToPlayerEvents(socket){
	socket.removeAllListeners("start-game");
	socket.removeAllListeners("restart-game");
	socket.removeAllListeners("game-over");
	socket.removeAllListeners("quit-game-player");
}


function gameOver(self, data){
	self.props.setGameOver(true, data)
	// cb('setGameOver', true)
}

function sendOrientation(coords, self, socket){
	// self.props.push('/inthefunction')
	if (self.props.room){
		let data = {
			room: self.props.room,
			coords: coords
		}
		emit('device-orientation', data, socket)
	}
}

function restartGame(cb){
	cb('setGameOver', false)
}

function startGameSocket(self, socket){	
	self.props.startGame()
	emit('start-game', self.props.room, socket)
}

function quitGameSocket(self, socket){
	self.props.push('/m/home')
	emit('quit-game-player', self.props.room, socket)
}

function quitGamePlayer(self){
	self.props.push('m/home')
}

function restartGameSocket(self, socket){
	emit('restart-game', self.props.room, socket)
	self.props.setGameOver(false)	
}

function gameStarted(cb){
	cb('startGame', false)
}



function emit(action, data, socket){
	socket.emit(action, data)
}

export { 
	unsubscribeToPlayerEvents,
	restartGameSocket,
	quitGameSocket,
	startGameSocket,
	sendOrientation,
	subscribeToPlayerEvents,

};