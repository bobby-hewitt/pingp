function subscribeToHostEvents(self, socket, cb) {
'quiz-player-response'
	socket.on('quiz-player-response', playerResponse.bind(this, self, socket))	
}

function playerResponse(self, socket, data){
	console.log('setting responses', data)
	self.props.setResponse(data)
}

function unsubscribeToHostEvents(socket) {
	// socket.removeAllListeners("start-game");
	// socket.removeAllListeners("device-orientation-sending");
	// socket.removeAllListeners("quit-game-player");
	// socket.removeAllListeners("restart-game");
}


function sendPlayersToWaiting(){
	socket.emit('quiz-send-players-to-waiting')
}

function showQuestionSocket(self, socket){
	self.props.showQuestionHost()
	socket.emit('quiz-show-question', self.props.currentQuestion)
}


export {
	showQuestionSocket,
	subscribeToHostEvents,
	unsubscribeToHostEvents
};