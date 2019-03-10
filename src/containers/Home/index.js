import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './style.scss'
import SocketListener from '../SocketListener'
import Canvas from 'components/canvas'
import { gameOver, powerUpGained } from 'sockets/host'
import { setGameOver, powerUpUsedGameplay } from 'actions/gameplay'
import ReactGA from 'react-ga';

class Home extends Component {


	constructor(props){
		super(props)
		this.timeouts = []
		this.powerUpDuration = 5000
		this.player1PowerUpTimeout = null
		this.player1PowerUpTimeout = null
		this.speed = 1
		this.state = {
			height: window.innerHeight,
			width:window.innerWidth,
			yDir: 0,
			yDir2: 0,
			is2Player: false,
			countdown: false,
			isPlaying: false,
			countdownNumber: '3',
			gameOver: false,
		}
	}

	componentDidMount(){
		console.log(encodeURIComponent('http://www.pingp.co'))





		this.initialiseAnalytics()
		window.addEventListener("resize", () => {
			console.log(window.innerHeight, window.innerWidth)
			this.setState({height:window.innerHeight, width: window.innerWidth})
		});
	}

	initialiseAnalytics(){
 		ReactGA.initialize('UA-135889592-1');
		ReactGA.pageview('/player');
	}

	componentWillUnmount(){
		clearTimeout(this.player1PowerUpTimeout)
		clearTimeout(this.player2PowerUpTimeout)
		for (var i = 0; i < this.timeouts.length; i++){
			clearTimeout(this.timeouts[i])
		}
	}

	componentWillReceiveProps(np){
		// if (!this.props.player1PowerUp && np.player1PowerUp ){
		// 	clearTimeout(this.player1PowerUpTimeout)
		// 	this.player1PowerUpTimeout = setTimeout(() => {
		// 		let obj = {
		// 			playerNumber: 1,
		// 			powerUp: false
		// 		}
		// 		this.props.powerUpUsedGameplay(obj)
		// 	}, this.powerUpDuration)
		// }
		// if (!this.props.player2PowerUp && np.player2PowerUp ){
		// 	clearTimeout(this.player2PowerUpTimeout)
		// 	this.player2PowerUpTimeout = setTimeout(() => {
		// 		let obj = {
		// 			playerNumber: 2,
		// 			powerUp: false
		// 		}
		// 		this.props.powerUpUsedGameplay(obj)
		// 	}, this.powerUpDuration)
		// }
		//new player 1 data
		if (this.state.yDir !== np.coords.y){
			this.setState({yDir:np.coords.y})
		}
		//new player 2 data
		if (this.state.yDir2 !== np.coords2.y){
			this.setState({yDir2:np.coords2.y, is2Player:true})
		}
		//start game
		if (!this.props.gameIsStarted && np.gameIsStarted){
			this.startGame()
		} 
		//start a subsequent game
		if (this.props.gameOver && !np.gameOver){
			this.setState({countdownNumber: '3', countdown: true, isPlaying: false, gameOver: false}, () => {
				this.startGame()
			})
		}
		//game over 
		if (!this.props.gameOver && np.gameOver){
			this.clearPowerUps()
			this.setState({gameOver: true})
		}
		//stop game
		else if (this.props.gameIsStarted && !np.gameIsStarted){
			for (var i = 0; i < this.timeouts.length; i++){
				clearTimeout(this.timeouts[i])
			}
			this.setState({isPlaying: false, countdown: false, countdownNumber: '3'})
		} 
	}


	startGame(){
		for (var i = 0; i < this.timeouts.length; i++){
			clearTimeout(this.timeouts[i])
		}
		this.countdown('3', 0, true, 0)
		this.countdown('2', 1000, true, 1)
		this.countdown('1', 2000, true, 2)
		this.countdown('3', 3000, false, 3)
	}

	countdown(n, delay, show, timeoutIndex){
		this.timeouts[timeoutIndex] = setTimeout(() => {
			this.setState({countdownNumber: n, countdown: show, isPlaying: !show})
		},delay)
	}

	gameOver(winner){
		gameOver(this, winner)
	}

	powerUpGained(player){
		let obj = {
			playerData: this.props.players[player-1],
			playerNumber: player
		}
		if(this.props.players[player-1]){
			powerUpGained(obj)
		}
	}

	clearPowerUps(){
		//reset power ups
		const obj = {
			playerNumber: 1,
			powerUp: false
		}
		
		const obj2 = {
			playerNumber: 2,
			powerUp: false
		}
		this.props.powerUpUsedGameplay(obj)
		this.props.powerUpUsedGameplay(obj2)	
	}

	render(){
		const online = true
		let uri = false;
		if (this.props.roomCode){
			uri = online ? 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=' +  encodeURIComponent('http://www.pingp.co/m/' + this.props.roomCode.toLowerCase()) :  
			'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=http://192.168.1.117:3000/m/' + this.props.roomCode.toLowerCase()
		} 
		
		
			if(this.state.height < 500 || this.state.width < 800){
				return(
					<div className="tooSmall">
						<div>
							<p className="players">Your screen is too small to host a game.<br/><br/> Try on a laptop or desktop</p>							
						</div>
					</div>
				)
			} 
			return(
			<div className="home">
				<SocketListener isHost/>
				<Canvas
					player1PowerUp={this.props.player1PowerUp}
					player2PowerUp={this.props.player2PowerUp}
					scored={this.clearPowerUps.bind(this)}
					powerUpGained={this.powerUpGained.bind(this)}
					height={this.state.height}
					width={this.state.width}
					isGameOver={this.state.gameOver}
					gameOver={this.gameOver.bind(this)}
					isPlaying={this.props.gameIsStarted}
					isPlaying={this.state.isPlaying}
					yDir={this.state.yDir}
					yDir2={this.state.yDir2}
					is2Player={this.props.players.length == 2}
					numOfPlayers={this.props.players.length}/>
					
					<div className="code">
						<div className="headerContainer">
							{uri && !this.props.gameIsStarted && this.props.players.length < 2 &&
								<div className="qr">
									<p>Open the camera on your phone <br/>and focus on the QR code</p>
									<img className="qrCode" src={uri} />
									<p>Otherwise just go to:<br/><span className="instructions">www.pingp.co/m/{this.props.roomCode ? this.props.roomCode.toLowerCase() : ''}</span></p>	
								</div>
							}
							{!this.props.gameIsStarted && this.props.players.length >= 2 &&
								<h4 className="qr">Press play to start</h4>
							}
							{!this.props.gameIsStarted &&
								<div className="socials">
									<a href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fwww.pingp.co&t=Online%202%20Plsayer%20Pong" target="blank">
										<div className="social" style={{backgroundImage: 'url(' + require('assets/images/facebook.png')+ ')'}} />
			 						</a>
			 						<a href="http://twitter.com/share?text=You%20have%20got%20to%20play%20this&url=http%3A%2F%2Fwww.pingp.co&hashtags=funAndGames" target="blank">
										<div className="social" style={{backgroundImage: 'url(' + require('assets/images/twitter.png')+ ')'}} />
			 						</a>
		 						</div>
							}
							{!this.props.gameIsStarted && this.props.players.length < 2 &&
								<div>
									<p className="players"><span className="instructions">PingP (1-2 players)</span></p>
									<p className="instructions"></p>		
								</div>
							}
							{this.state.countdown &&
								<h1 className="qr">{this.state.countdownNumber}</h1>
							}
							{this.props.gameOver &&
								<h1 className="qr">Game over</h1>
							}
							{this.props.gameIsStarted && this.props.players.length < 2 &&
								<p className="help">Pause game to add another player</p>
							}
						</div>
					</div>

					
				</div>
		)
	}
}

const mapStateToProps = state => ({
	player1PowerUp: state.gameplay.player1PowerUp,
	player2PowerUp: state.gameplay.player2PowerUp,
	gameIsStarted: state.gameplay.gameIsStarted,
	roomCode: state.host.roomCode,
	coords: state.host.coords,
	coords2: state.host.coords2,
	players: state.host.players,
	gameOver: state.gameplay.gameOver,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  push: (path) => push(path),
  setGameOver,
  powerUpUsedGameplay,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)