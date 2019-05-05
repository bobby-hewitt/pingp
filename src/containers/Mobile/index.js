import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './style.scss'
import SocketListener from '../SocketListener'
import { joinRoom, sendOrientation, startGameSocket, quitGameSocket, restartGameSocket, powerUpUsedSocket } from '../../sockets/player'
import { setSelf, powerUpUsed  } from '../../actions/player'
import { startGame, setGameOver } from '../../actions/gameplay'
import ReactGA from 'react-ga';

class Mobile extends Component {

	constructor(props){
		super(props)
		this.state = {
			xDir: 0,
			yDir: 0,
			dir: 'equal',
			visualSpeed: 0,
		}
		this.speeds = ['-6','-5','-4','-3','-2','-1','0','1','2','3','4','5','6']
	}

	componentWillMount(){ 
		this.initialiseAnalytics()
		let code = window.location.pathname.split('/')[2]
		if (code){

			let obj = {
		      name: '',
		      room: code.toUpperCase()
		    }
		    joinRoom(obj, this)
		}
	}

	initialiseAnalytics(){
 		ReactGA.initialize('UA-135889592-1');
		ReactGA.pageview('/player');
	}

	componentWillReceiveProps(np){
		if (!np.playerNumber && this.props.playerNumber){
			this.props.push('not-found')
		}

	}

	componentDidMount(){
		window.addEventListener('deviceorientation', (orientation) => {
			let {y, dir, visualSpeed } = this.findLimit(orientation.beta)
			// let x = this.findLimit(orientation.gamma)
			this.setState({yVis: y})
			if (y !== this.state.yDir){				
				let dirs = {
					y: y,
					playerNumber: this.props.playerNumber
				}
				sendOrientation(dirs, this)
				this.setState({yDir: y, visualSpeed, dir})
			}
		})
	}

	findLimit(coord){
		// if (coord < -27.5 + 45) return {y: -20, dir: 'down', visualSpeed: 5}
		if (coord < -35 + 45) return {y: -12, dir: 'down', visualSpeed: 4}
		else if (coord < -25 + 45) return {y: -9, dir: 'down', visualSpeed: 3}
		else if (coord < -15 + 45) return {y: -6, dir: 'down', visualSpeed: 2}
		else if (coord < -5 + 45) return {y: -3, dir: 'down', visualSpeed: 1}
		else if (coord < 5 + 45) return {y: 0, dir: 'equal', visualSpeed: 0}
		else if (coord < 15 + 45) return {y: 3, dir: 'up', visualSpeed: 1}
		else if (coord < 25 + 45) return {y: 6, dir: 'up', visualSpeed: 2}
		else if (coord < 35 + 45) return {y: 9, dir: 'up', visualSpeed: 3}
		// else if (coord < 45 + 45) return {y: 16, dir: 'up', visualSpeed: 4}
		else return {y: 12, dir: '+', dir: 'up', visualSpeed: 4}
	}

	usePowerdown(){
		let obj = {
			room: this.props.room,
			playerNumber: this.props.playerNumber,
			powerUp: this.props.powerUp
		}
		
		powerUpUsedSocket(obj, this)
	}

	render(){
		return(
			<div className="mobile">
				<SocketListener />
			
				<div className="gamePadContainer">
						<div className="gamePad">
							<p className="instructionsMobile">{this.state.yVis}</p>
							{this.props.gameOver &&
								<p className="playerResult">{this.props.winner.indexOf(this.props.playerNumber) > -1 ? 'You win' : 'You lose'}</p>
							}
							
							<div className="speedContainer">
								{this.state.dir === 'up' && Array.apply(null, { length: this.state.visualSpeed }).map((e, i) => {
									return(	
										<div key={i} className=" fontawesome chevronUp" style={{}}/>
									)
								})}
								{this.state.dir === 'down' && Array.apply(null, { length: this.state.visualSpeed }).map((e, i) => {
									return(	
										<div key={i} className=" fontawesome chevronDown" style={{}}/>
									)
								})}
								{this.state.dir === 'equal' && <div className="equal fontawesome " />}
								
							</div>
						</div>
				</div>
				<div className="info">	
					<div className="buttonSetMobile">
						<div className="pausePlay buttonMobile">
							{!this.props.gameIsStarted && !this.props.gameOver &&
								<img src={require('assets/images/playBlack.png')} className="play" onClick={startGameSocket.bind(this, this)}/>
							}
							{this.props.gameIsStarted && !this.props.gameOver &&
								<img src={require('assets/images/pauseBlack.png')} onClick={startGameSocket.bind(this, this)}/>
							}
							{this.props.gameOver &&
								<img src={require('assets/images/playBlack.png')} className="play" onClick={restartGameSocket.bind(this, this)}/>
							}
						</div>
						{!this.props.gameOver &&
							<p className="headerMobile">Player{JSON.stringify(this.props.playerNumber) === 'null' ? 0 : JSON.stringify(this.props.playerNumber)} </p>
						}
						{this.props.gameOver &&
							<p className="headerMobile">Player{JSON.stringify(this.props.playerNumber) === 'null' ? 0 : JSON.stringify(this.props.playerNumber)} </p>
						}
						<div className="buttonMobile warning quit" onClick={quitGameSocket.bind(this, this)} >
							<p>Quit</p>
						</div>	
					</div>	
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	gameIsStarted: state.gameplay.gameIsStarted,
	router: state.router,
	room: state.player.room,
	playerNumber: state.player.playerNumber,
	gameOver: state.gameplay.gameOver,
	winner: state.gameplay.winner,
	powerUp: state.player.powerUp
})

const mapDispatchToProps = dispatch => bindActionCreators({
  push: (path) => push(path),
  setSelf,
  setGameOver,
  powerUpUsed,
  startGame,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Mobile)