import openSocket from 'socket.io-client';
import localSetup from 'config/local'
const socket = localSetup.isLocal ? openSocket(localSetup.localServer+ ':9000') : openSocket(localSetup.publicServer)

const POWER_UP_DURATION = 5000
function subscribeToHostEvents(self, cb) {
	console.log('SUBSCRIBING TO HOST')
	socket.emit('host-connected');
	socket.on('room-code-generated', roomCodeGenerated.bind(this, cb))
  	socket.on('player-joined', playerJoined.bind(this, cb))
  	socket.on('start-game', startGame.bind(this, cb))
  	socket.on('player-responded', playerResponded.bind(this, self))
  	socket.on('device-orientation-sending', gotCoords.bind(this, cb))
  	socket.on('quit-game-player', quitGamePlayer.bind(this, cb))
  	socket.on('restart-game', restartGame.bind(this, cb))
  	socket.on('power-up-used', powerUpUsed.bind(this, self))
  	
}

function powerUpUsed(self, data){
	self.props.powerUpUsedGameplay(data)
}

function powerUpGained(data, self){
	socket.emit('power-up-gained', data)
}

function gotCoords(cb, data){
	console.log('GOT COORDS')
	if (data.coords.playerNumber === 1){
		cb('setCoords1', data)
	} else {
		cb('setCoords2', data)
	}
}

function restartGame(cb){
	cb('setGameOver', false)
}

function quitGamePlayer(){
	window.location.reload()
}

function startGame(cb){
	cb('startGame')
}

function roomCodeGenerated(cb, data){
	cb('setRoomCode', data)
}

function gameOver(self, winner){
	self.props.setGameOver(true)
	socket.emit('game-over', winner)
}

function playerJoined(cb, data){
	cb('addPlayer', data)
}

function startRound(self, cb){
	socket.emit('start-round');
}

function playerResponded(self, data){
	self.props.setResponses(data)
}

export { 
	powerUpGained,
	gameOver,
	subscribeToHostEvents,
	startRound
};