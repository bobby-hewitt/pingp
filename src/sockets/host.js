import openSocket from 'socket.io-client';
// const  socket = openSocket('172.23.150.208:9000');
const  socket = openSocket('http://bping.herokuapp.com');

function subscribeToHostEvents(self, cb) {
	console.log('SUBSCRIBING TO HOST')
	socket.emit('host-connected');
	socket.on('room-code-generated', roomCodeGenerated.bind(this, cb))
  	socket.on('player-joined', playerJoined.bind(this, cb))
  	socket.on('start-round', startRound.bind(this, self))
  	socket.on('player-responded', playerResponded.bind(this, self))
  	socket.on('device-orientation-sending', gotCoords.bind(this, cb))
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

function roomCodeGenerated(cb, data){
	console.log('setting roomcode', data)
	cb('setRoomCode', data)
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
	subscribeToHostEvents,
	startRound
};