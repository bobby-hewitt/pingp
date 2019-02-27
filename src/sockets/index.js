import openSocket from 'socket.io-client';
import { subscribeHost } from './host'
import { subscribePlayer } from './player'

const  socket = openSocket('217.138.18.10:9000');

function subscribeToSocketEvents(self, isHost, cb) {
	if (isHost){
		subscribeHost(self, cb)
	} else {
		subscribePlayer(self, cb)
	}
	//socket.on('success-joining-room', successJoiningRoom.bind(this, self))
	//socket.on('error-joining-room', errorJoiningRoom.bind(this))
	
}

function subscribeHost(){
	socket.emit('host-connected');
	socket.on('room-code-generated', roomCodeGenerated.bind(this, cb))
  	socket.on('player-joined', playerJoined.bind(this, cb))
}




function successJoiningRoom(self, room){
	console.log('success joining room')
	self.props.push('waiting')
	window.localStorage.room = room
}
function errorJoiningRoom(){
	console.log('error joining room')
}


// emit

function joinRoom(data){
	// console.log('joining')
	// console.log(roomCode)
	data.id = socket.id
	emit('player-join-room', data)
}

function emit(action, data){
	// data.room = window.localStorage.room
	socket.emit(action, data)
}





export { 
	subscribeToSocketEvents,
	joinRoom
};