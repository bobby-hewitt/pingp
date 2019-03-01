import openSocket from 'socket.io-client';
// const  socket = openSocket('172.23.150.213:9000');
const  socket = openSocket('https://bping.herokuapp.com');

function subscribeToHostEvents(self, cb) {
	console.log('SUBSCRIBING TO HOST')
	socket.emit('host-connected');
	socket.on('room-code-generated', roomCodeGenerated.bind(this, cb))
  	socket.on('player-joined', playerJoined.bind(this, cb))
  	// socket.on('start-round', startRound.bind(this, self))
  	socket.on('start-game', startGame.bind(this, cb))
  	socket.on('player-responded', playerResponded.bind(this, self))
  	socket.on('device-orientation-sending', gotCoords.bind(this, cb))
  	socket.on('quit-game-player', quitGamePlayer.bind(this, cb))
  	socket.on('restart-game', restartGame.bind(this, cb))
}

function gotCoords(cb, data){
	if (data.coords.playerNumber === 1){
		cb('setCoords1', data)
	} else {
		cb('setCoords2', data)
	}
	// console.log('receiving coords', data)
	// cb('setCoords1', data)
}

function restartGame(cb){
	cb('setGameOver', false)
}

function quitGamePlayer(){
	window.location.reload()
}

function startGame(cb){
	console.log('receiving start gaem')
	cb('startGame')
}

function roomCodeGenerated(cb, data){
	console.log('setting roomcode', data)
	cb('setRoomCode', data)
}

function gameOver(self, winner){
	self.props.setGameOver(true)
	socket.emit('game-over', winner)
}

// function startRound(self){
// 	self.props.startRound()
// }

function playerJoined(cb, data){
	console.log('player joined', data)
	cb('addPlayer', data)
	// console.log('player joined', data)
}

function startRound(self, cb){
	socket.emit('start-round');
}

function playerResponded(self, data){
	console.log('player response')
	self.props.setResponses(data)

}

export { 
	gameOver,
	subscribeToHostEvents,
	startRound
};