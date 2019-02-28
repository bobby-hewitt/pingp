import openSocket from 'socket.io-client';
// const  socket = openSocket('172.23.150.208:9000');
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
	socket.on('game-over', gameOver.bind(this, cb))
}

function roomFull(self){
	self.props.push('full')
}

function hostQuit(self){
	self.props.push('not-found')
}

function gameOver(cb){
	cb('setGameOver', true)
}


function successJoiningRoom(self, data){
	console.log('success joining room', data)
	// self.props.push('player/waiting')
	// console.log(data)
	self.props.setPlayerRoom(data.result)
	self.props.setPlayerNumber(data.playerNumber)
	// window.localStorage.room = data
}
function errorJoiningRoom(){
	console.log('error joining room')
}

function startRound(self){
	console.log('starting round')
	self.props.push('player/buzzer')
}

function buzz(self){
	console.log('self', self.props)
	let data = {
		room: self.props.room.long,
		player: self.props.self,
		time: (new Date).getTime()
	}
	emit('player-buzz', data)
	self.props.push('player/waiting')
}

function sendOrientation(coords, self){
	console.log(self)
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
	console.log('EMITTING start game')
	self.props.startGame()
	emit('start-game', self.props.room.long)
}

// emit
function quitGameSocket(self){
	console.log('EMITTING start game')
	self.props.startGame()
	emit('quit-game-player', self.props.room.long)
}


function restartGameSocket(self){
	console.log('EMITTING restart game')
	// self.props.startGame()
	emit('restart-game', self.props.room.long)
}


function gameStarted(cb){
	cb('startGame', false)
}

function joinRoom(data, self){
	// console.log('joining')
	// console.log(roomCode)
	data.id = socket.id
	self.props.setSelf(data)
	emit('player-join-room', data)
}

function emit(action, data){
	// data.room = window.localStorage.room
	socket.emit(action, data)
}

export { 
	restartGameSocket,
	quitGameSocket,
	startGameSocket,
	sendOrientation,
	subscribeToPlayerEvents,
	joinRoom,
	buzz
};