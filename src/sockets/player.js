import openSocket from 'socket.io-client';
// const  socket = openSocket('172.23.150.213:9000');
const  socket = openSocket('https://bping.herokuapp.com');

function subscribeToPlayerEvents(self, cb) {
	console.log('SUBSCRIBING TO PLAYER')
	socket.on('success-joining-room', successJoiningRoom.bind(this, self))
	socket.on('error-joining-room', errorJoiningRoom.bind(this))
	socket.on('start-round', startRound.bind(this, self))
	socket.on('start-game', gameStarted.bind(this, cb))
	socket.on('room-full', roomFull.bind(this, self))
	socket.on('host-quit', hostQuit.bind(this, self))
	socket.on('restart-game', restartGame.bind(this, cb))
	socket.on('game-over', gameOver.bind(this, self))
	socket.on('power-up-gained', powerUpGained.bind(this, self))
}

function getPowerup(){
	let powerups = ['invertOpponent']
    let r = Math.floor(Math.random() * powerups.length)
    return powerups[r]
}

function powerUpGained(self, data){
	self.props.powerUpGained(getPowerup())
}

function powerUpUsedSocket(data, self){	
	emit('power-up-used', data)
	self.props.powerUpUsed()
}

function roomFull(self){
	self.props.push('full')
}

function hostQuit(self){
	self.props.push('not-found')
}

function gameOver(self, data){
	self.props.setGameOver(true, data)
	// cb('setGameOver', true)
}


function successJoiningRoom(self, data){
	self.props.setPlayerRoom(data.result)
	self.props.setPlayerNumber(data.playerNumber)
}
function errorJoiningRoom(){

}

function startRound(self){
	self.props.push('player/buzzer')
}

function buzz(self){
	let data = {
		room: self.props.room.long,
		player: self.props.self,
		time: (new Date).getTime()
	}
	emit('player-buzz', data)
	self.props.push('player/waiting')
}

function sendOrientation(coords, self){
	if (self.props.room){
		let data = {
			room: self.props.room.long,
			coords: coords
		}
		emit('device-orientation', data)
	}
}

function restartGame(cb){
	cb('setGameOver', false)
}


// emit
function startGameSocket(self){
	self.props.startGame()
	emit('start-game', self.props.room.long)
}

// emit
function quitGameSocket(self){
	self.props.startGame()
	emit('quit-game-player', self.props.room.long)
}


function restartGameSocket(self){
	emit('restart-game', self.props.room.long)
	self.props.setGameOver(false)	
}


function gameStarted(cb){
	cb('startGame', false)
}

function joinRoom(data, self){
	data.id = socket.id
	self.props.setSelf(data)
	emit('player-join-room', data)
}

function emit(action, data){
	socket.emit(action, data)
}

export { 
	powerUpUsedSocket,
	restartGameSocket,
	quitGameSocket,
	startGameSocket,
	sendOrientation,
	subscribeToPlayerEvents,
	joinRoom,
	buzz
};