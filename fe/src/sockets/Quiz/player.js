function subscribeToPlayerEvents(self, socket, cb) {
	socket.on('quiz-show-question-player', showQuestion.bind(this, self))
	socket.on('quiz-send-to-waiting', sendToWaiting.bind(this, self))
 //  	socket.on('update-players', updatePlayers.bind(this, cb))
	// socket.on('chosen-game', chosenGame.bind(this, self, socket))
}

function unsubscribeToPlayerEvents(socket) {
	// socket.removeAllListeners("start-game");
	// socket.removeAllListeners("device-orientation-sending");
	// socket.removeAllListeners("quit-game-player");
	// socket.removeAllListeners("restart-game");
}

function showQuestion(self, socket){
	self.props.showQuestionPlayer()
}

function sendToWaiting(self){
	self.props.setWaiting()
}

function sendResponse(self, data, socket){
	data.time = (new Date()).getTime()
	data.id = socket.id
	data.room = self.props.room
	self.props.setWaiting()
	socket.emit('quiz-player-response', data)
	//rather tahn push I should maybe use state to control waiting vs interacting
	// self.props.push('/m/quiz/waiting')
}


// function chosenGame(self, nothing, data){
// 	console.log(data)
// 	self.props.push('h/' + data)
// }

// function roomCodeGenerated(cb, data){
// 	cb('setRoomCode', data)
// }

// function updatePlayers(cb, data){
// 	console.log('updateing players', data)
// 	cb('updatePlayers', data)
// }

export {
	showQuestion,
	subscribeToPlayerEvents,
	unsubscribeToPlayerEvents,
};