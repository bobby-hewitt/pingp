import React, { Component } from 'react'
import './style.scss'

export default class Canvas extends Component {

	constructor(props){
		super(props)
		// canvas
		this.ctx = null;
		//player
		this.playerHeight = 120;
		this.playerWidth = 7;
		this.playerX = 20;
		this.playerY = window.innerHeight / 2 - this.playerHeight / 2
		//player 2
		this.player2X = window.innerWidth - this.playerX;
		this.player2Y = window.innerHeight / 2 - this.playerHeight / 2
		//ball
		this.ballSize = 5;
		this.ballX = window.innerWidth / 2;
		this.ballY = window.innerHeight / 2 -100;
		// this.ballY = window.innerHeight / 2 ;
		this.ballDirX = 1;
		this.ballDirY = 1;
		this.ballYSpeed = Math.random() < 0.5 ? 5 : -5
		// this.ballYSpeed = 0;
		this.ballXSpeed = Math.random() < 0.5 ? 5 : -5
		// this.ballXSpeed = -5;
		//game
		this.maxScore = 7;
		this.hasStarted = false;
		this.state = {
			player1PowerUp: false,
			player2PowerUp: false,
			player1Score: 0,
			player2Score: 0,
		}
	}

	componentWillReceiveProps(np){
		//2 players have joined.  Ready to play
		if (this.props.numOfPlayers !== 2 && np.numOfPlayers === 2){
			this.resetScores()
			this.setup()
		}
		//reset because starting new game
		if (this.props.isGameOver && !np.isGameOver){
			this.hasStarted = false;
			this.playerY = window.innerHeight / 2 - this.playerHeight / 2
			this.player2X = window.innerWidth - this.playerX;
			this.player2Y = window.innerHeight / 2 - this.playerHeight / 2
			this.ballX = window.innerWidth / 2;
			this.ballY = window.innerHeight / 2 -100;
			this.resetScores()
		}
		//let players move between games
		if (!this.props.isGameOver && np.isGameOver){
			this.hasStarted = false;
		}
		//window resize.  Adjust canvas and limits
		if(this.props.height !== np.height || this.props.width !== np.width){
			this.playerY = window.innerHeight / 2 - this.playerHeight / 2
			this.player2X = window.innerWidth - this.playerX;
			this.player2Y = window.innerHeight / 2 - this.playerHeight / 2
			this.ballX = window.innerWidth / 2;
			this.ballY = window.innerHeight / 2 -100;
		}
	}

	powerUp(player){
		let type = player === 1 ? 'player1PowerUp' : 'player2PowerUp'
		// handle socket call for power up
		this.props.powerUpGained(player)
		this.setState({[type]: true}, () => {
			setTimeout(() => {
				this.setState({[type]: false})
			},300)
		})
		
	}


	componentDidMount(){
		//get a reference to the canvas and being drawing
		let ctx = this.refs.canvas.getContext('2d')
		this.ctx = ctx
		this.loop()
	}

	resetScores(){
		this.setState({
			player1Score: 0,
			player2Score: 0
		})
	}

	setup(){
		// reset variables
		this.ballY = window.innerHeight / 2 - 100
		this.ballX = window.innerWidth / 2
		this.ballYSpeed = Math.random() < 0.5 ? 5 : -5
		this.ballXSpeed = Math.random() < 0.5 ? 5 : -5
	}

	loop(){
		//clear things
		this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
		//update things
		if (this.props.isPlaying && !this.props.isGameOver){
			this.hasStarted = true
			this.updateBall()
			if (this.props.numOfPlayers === 2) this.updatePlayer2()
			this.updatePlayer()
		} else if (!this.props.isPlaying && !this.hasStarted){
			this.updatePlayer2()
			this.updatePlayer()
		}
		//check if player has hit ball if the xPos is near to a player
		if (this.ballX <= this.playerX && this.ballX > this.playerX - this.playerWidth){
			this.checkCollision()
		} else if (this.ballX + this.ballSize >= this.player2X && this.ballX < this.player2X + this.playerWidth){
			this.checkPlayer2Collision()
		}
		//draw everything
		this.drawBoard()
		this.drawPlayer()
		this.drawBall()
		//do it all again
		window.requestAnimationFrame(this.loop.bind(this))
	}

	drawBoard(){
		this.ctx.beginPath();
		this.ctx.setLineDash([15, 15]);
		this.ctx.strokeStyle = '#555';
		this.ctx.moveTo(window.innerWidth / 2, 0);
		this.ctx.lineTo(window.innerWidth / 2, window.innerHeight);
		this.ctx.stroke();
	}

	updateBall(){
		this.ballX = this.ballX + (this.ballXSpeed * this.ballDirX)
		this.ballY = this.ballY + (this.ballYSpeed * this.ballDirY)
		//ball has gone of right edge of screen
		if (this.ballX > window.innerWidth - this.ballSize ){
			//if there is a second player let it go and reset
			if (this.props.numOfPlayers === 2){
				this.props.scored()
				if (this.state.player1Score + 1 < this.maxScore){
					this.setState({player1Score: this.state.player1Score + 1})
				} else {
					this.setState({player1Score: this.state.player1Score + 1}, () => {
						this.props.gameOver('player1')
					})
				}
				this.setup()
			} else {
				//otherwise turn the ball around
				this.ballDirX *= -1
			}
		//ball has gone off left edge of screen reset
		} else if (this.ballX < 0){
			this.props.scored()
			//if there are 2 players count scores
			if (this.props.numOfPlayers === 2){
				if (this.state.player2Score + 1 < this.maxScore){
					this.setState({player2Score: this.state.player2Score + 1})
				} else {
					this.setState({player2Score: this.state.player2Score + 1}, () => {
						this.props.gameOver('player2')
					})
				}
			}
			this.setup()
		} 
		//turn ball around on y axis
		if (this.ballY > window.innerHeight - this.ballSize || this.ballY <= 0){
			this.ballDirY *= -1
		}

	}

	drawBall(){
		function Circle(x, y, r) {
		    "use strict";
		    this.x = (x === null) ? 0 : x;
		    this.y = (y === null) ? 0 : y;
		    this.r = (r === null) ? 0 : r;
		    this.draw = function(ctx) {
		       ctx.beginPath();
		       ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
		       ctx.fillStyle = "#f7f7f7";
		       ctx.fill();
		    }
		}
		var circ = new Circle(this.ballX, this.ballY, this.ballSize);
		circ.draw(this.ctx);
	}

	updatePlayer(){
		//dont let player go beyond boundaries of the screen
		this.playerY =  
			(this.playerY - this.props.yDir) > window.innerHeight - this.playerHeight ?
				window.innerHeight - this.playerHeight : 
			(this.playerY - this.props.yDir) <= 0 ?
				0 :
				this.playerY - this.props.yDir
	}
	updatePlayer2(){
		//dont let player go beyond boundaries of the screen
		this.player2Y =  
			(this.player2Y - this.props.yDir2) > window.innerHeight - this.playerHeight ?
				window.innerHeight - this.playerHeight : 
			(this.player2Y - this.props.yDir2) <= 0 ?
				0 :
				this.player2Y - this.props.yDir2
	}

	drawPlayer(){
		function Player(x, y, w, h) {
		    "use strict";
		    this.x = (x === null) ? 20 : x;
		    this.y = (y === null) ? 0 : y;
		    this.draw = function(ctx) {
		       ctx.rect(x,y,w,h);
		       ctx.fillStyle = "#f7f7f7";
		       ctx.fill();
		    }
		}
		var player = new Player(this.playerX - this.playerWidth, this.playerY, this.playerWidth,this.playerHeight);
		player.draw(this.ctx);
		var player2 = new Player(this.player2X - this.playerWidth, this.player2Y, this.playerWidth,this.playerHeight);
		player2.draw(this.ctx);
		
	}

	checkCollision(){
		let top = this.playerY
		let bottom = this.playerY + this.playerHeight
		if (this.ballY > top && this.ballY < bottom){
			this.ballDirX *= -1
			//increase ballXSpeed every time player 1 hits the ball
			if (this.ballDirX < 0){
				this.ballXSpeed -= 1
			} else{
				this.ballXSpeed += 1
			}
			let normalisedSpeed = this.props.yDir > 0 ? this.props.yDir : this.props.yDir * -1
			//changes ball y speed if paddle is moving on impact
			if (this.playerY !== 0 && this.playerY !== window.innerHeight - this.playerHeight && normalisedSpeed > 10){
				this.powerUp(1)
				if (this.ballYSpeed > 0){
					this.ballYSpeed += this.props.yDir / 3
				} else {
					this.ballYSpeed -= this.props.yDir / 3
				}
				
			}
		}
	}

	checkPlayer2Collision(){
		let top2 = this.player2Y
		let bottom2 = this.player2Y + this.playerHeight
		if (this.ballY > top2 && this.ballY < bottom2){
			this.ballDirX *= -1
			// establish player speed 
			let normalisedSpeed = this.props.yDir > 0 ? this.props.yDir : this.props.yDir * -1
			//changes ball y speed if paddle is moving on impact

			if (this.player2Y !== 0 && this.player2Y !== window.innerHeight - this.playerHeight && normalisedSpeed > 10){
				this.powerUp(2)
				if (this.ballYSpeed > 0){
					this.ballYSpeed += this.props.yDir2 / 3
				} else {
					this.ballYSpeed -= this.props.yDir2 / 3
				}
			}	
		}	
	}

	render(){
		return(
			<div>
				<canvas ref="canvas" id="canvas" height={this.props.height} width={this.props.width}>
				</canvas>
				<div className="scores">
					{this.props.numOfPlayers > 1 &&
						<div className="row">
							<p>{this.state.player1Score}</p>
							<p> </p>
							<p>{this.state.player2Score}</p>
						</div>
					}
				</div>	
				{this.state.player1PowerUp &&
					<img className="powerUpPlayer1" style={{top: this.playerY + 35 +'px', left: this.playerX + 'px'}}src={require('assets/images/lightning.png')} />
				}
				{this.state.player2PowerUp &&
					<img className="powerUpPlayer2" style={{top: this.player2Y + 35 +'px', left: this.player2X - 30 + 'px'}}src={require('assets/images/lightning.png')} />
				}	
			</div>
		)
	}
}