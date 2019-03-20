function subscribeToHostEvents(self, socket, cb) {
  	socket.on('start-game', startGame.bind(this, cb))
  	socket.on('device-orientation-sending', gotCoords.bind(this, cb))
  	socket.on('quit-game-player', quitGamePlayer.bind(this, self))
  	socket.on('restart-game', restartGame.bind(this, cb))
}
function unsubscribeToHostEvents(socket) {
	socket.removeAllListeners("start-game");
	socket.removeAllListeners("device-orientation-sending");
	socket.removeAllListeners("quit-game-player");
	socket.removeAllListeners("restart-game");
}

function gotCoords(cb, data){
	console.log('getting coords data')
	if (data.coords.playerNumber === 1){
		cb('setCoords1', data)
	} else {
		cb('setCoords2', data)
	}
}

function restartGame(cb){
	cb('setGameOver', false)
}

function quitGamePlayer(self){
	self.props.push('h')
}

function startGame(cb){
	cb('startGame')
}

function gameOver(self, winner, socket){
	self.props.setGameOver(true)
	socket.emit('game-over', winner)
}

function startRound(self, cb, socket){
	socket.emit('start-round');
}



export { 
	unsubscribeToHostEvents,
	gameOver,
	subscribeToHostEvents,
	startRound
};