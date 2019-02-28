import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './style.scss'
import SocketListener from '../SocketListener'
import Canvas from 'components/canvas'
import { gameOver } from 'sockets/host'
import { setGameOver } from 'actions/gameplay'
class Home extends Component {


	constructor(props){
		super(props)
		this.timeouts = []
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
		}
	}

	componentDidMount(){
		window.addEventListener("resize", () => {
			this.setState({height:window.innerHeight, width: window.innerWidth})
		});
	}

	componentWillReceiveProps(np){
		if (this.state.yDir !== np.coords.y){
			// console.warn('new dirs player 1', np.coords)
			this.setState({yDir:np.coords.y})
		}
		if (this.state.yDir2 !== np.coords2.y){
			// console.warn('new dirs player 2', np.coords)
			this.setState({yDir2:np.coords2.y, is2Player:true})
		}
		if (!this.props.gameIsStarted && np.gameIsStarted){
			this.startGame()
		} else if (this.props.gameIsStarted && !np.gameIsStarted){

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

	gameOver(){
		gameOver(this)
		//send game over message
	}

	render(){
		const online = true
		let uri = false;
		if (this.props.roomCode){
			uri = online ? 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=' +  encodeURIComponent('http://www.pingp.co/m/' + this.props.roomCode.toLowerCase()) :  
			'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=http://172.23.150.208:3000/m/' + this.props.roomCode.toLowerCase()
		} 
		// console.log(uri)
		// console.log('numOfPlayers', this.props.players.length)
		return(
			<div className="home">
				<SocketListener isHost/>
				<Canvas 
					height={this.state.height}
					width={this.state.width}
					isGameOver={this.props.gameOver}
					gameOver={this.gameOver.bind(this)}
					isPlaying={this.props.gameIsStarted}
					isPlaying={this.state.isPlaying}
					yDir={this.state.yDir}
					yDir2={this.state.yDir2}
					is2Player={this.state.is2Player}
					numOfPlayers={this.props.players.length}/>
					<div className="code">
					<div className="headerContainer">
					{uri && !this.props.gameIsStarted &&
						<img className="qr" src={uri} />
					}
					{!this.props.gameIsStarted &&
						<div>
							<p className="players">2 players, your phones are the controllers.</p>
							<p>Scan the QR code or go to:</p>
							
							<p><span className="instructions">www.pingp.co/m/{this.props.roomCode ? this.props.roomCode.toLowerCase() : ''}</span></p>
						</div>
					}
					{this.state.countdown &&
						<h1 className="qr">{this.state.countdownNumber}</h1>
					}
					{this.props.gameOver &&
						<h1 className="qr">Game over</h1>
					}
					</div>
				</div>
				
				{this.state.height < 500 || this.state.width < 800 &&
					<div className="tooSmall">
						<div>
							<p className="players">Your screen is too small to host a game.<br/><br/> Try on a laptop or desktop</p>						
							
						</div>
					</div>
				}
			</div>
		)
	}
}

const mapStateToProps = state => ({
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
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)