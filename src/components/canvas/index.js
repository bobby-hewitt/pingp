import React, { Component } from 'react'
import './style.scss'

export default class Canvas extends Component {

	constructor(props){
		super(props)
		this.maxScore = 7;
		this.ctx = null;
		//player
		this.playerHeight = 100;
		this.playerWidth = 7;
		this.playerX = 20;
		this.playerY = window.innerHeight / 2 - this.playerHeight / 2
		//player 2
		this.player2X = window.innerWidth - this.playerX;
		this.player2Y = window.innerHeight / 2 - this.playerHeight / 2
		//scores
		this.player1Score = 0;
		this.player2Score = 0;
		//ball
		this.ballSize = 5;
		this.ballX = window.innerWidth / 2;
		this.ballY = window.innerHeight / 2 -100;
		this.ballDirX = 1;
		this.ballDirY = 1;
		this.ballYSpeed = Math.random() < 0.5 ? 5 : -5
		this.ballXSpeed = Math.random() < 0.5 ? 5 : -5
		this.state = {
			player1Score: 0,
			player2Score: 0,
		}
	}

	componentWillReceiveProps(np){
		if (this.props.numOfPlayers !== 2 && np.numOfPlayers === 2){
			this.resetScores()
			this.setup()
		}
		if (this.props.isGameOver && !np.isGameOver){
			this.resetScores()
		}
		if(this.props.height !== np.height || this.props.width !== np.width){
			this.playerY = window.innerHeight / 2 - this.playerHeight / 2
			this.player2X = window.innerWidth - this.playerX;
			this.player2Y = window.innerHeight / 2 - this.playerHeight / 2
			this.ballX = window.innerWidth / 2;
			this.ballY = window.innerHeight / 2 -100;
		}
	}


	componentDidMount(){
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
			this.updateBall()
			if (this.props.is2Player) this.updatePlayer2()
			this.updatePlayer()

		}
		
		//check thinggs
		if (this.ballX <= this.playerX && this.ballX > this.playerX - this.playerWidth){
			this.checkCollision()
		} else if (this.ballX + this.ballSize >= this.player2X && this.ballX < this.player2X + this.playerWidth){
			this.checkPlayer2Collision()
		}
		//draw things
		this.drawBoard()
		this.drawPlayer()
		this.drawBall()
		//loop things
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

	score(player){

	}

	updateBall(){
		this.ballX = this.ballX + (this.ballXSpeed * this.ballDirX)
		this.ballY = this.ballY + (this.ballYSpeed * this.ballDirY)
		if (this.ballX > window.innerWidth - this.ballSize ){
			if (this.props.is2Player){
				if (this.state.player1Score + 1 < this.maxScore){
					this.setState({player1Score: this.state.player1Score + 1})
				} else {
					this.setState({player1Score: this.state.player1Score + 1}, () => {
						this.props.gameOver()
					})
				}
				
				this.setup()
			} else {
				this.ballDirX *= -1
			}
		} else if (this.ballX < 0 && this.props.numOfPlayers > 0){
			if (this.props.is2Player){
				if (this.state.player2Score + 1 < this.maxScore){
					this.setState({player2Score: this.state.player2Score + 1})
				} else {
					this.setState({player2Score: this.state.player2Score + 1}, () => {
						this.props.gameOver()
					})
				}
			}
			this.setup()
		} else if (this.ballX < 0){
			this.ballDirX *= -1
		}
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
		this.playerY =  
			(this.playerY - this.props.yDir) > window.innerHeight - this.playerHeight ?
				window.innerHeight - this.playerHeight : 
			(this.playerY - this.props.yDir) <= 0 ?
				0 :
				this.playerY - this.props.yDir
	}
	updatePlayer2(){
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
		let firstBreak = this.playerY + this.playerHeight /5
		let bottom = this.playerY + this.playerHeight
		let secondBreak = bottom - this.playerHeight /5
		if (this.ballY > top && this.ballY < bottom){
			
			this.ballDirX *= -1
			if (this.ballDirX < 0){
				console.log('increassing ball speed', this.ballXSpeed)
				this.ballXSpeed -= 1
			} else{
				console.log('increassing ball speed', this.ballXSpeed)
				this.ballXSpeed += 1
			}
			if (this.ballY < firstBreak){
				this.ballYSpeed -= 1
			} else if (this.ballY > secondBreak){
				this.ballYSpeed += 1
			}
		}
	}

	checkPlayer2Collision(){
		let top2 = this.player2Y
		let firstBreak2 = this.player2Y + this.playerHeight /5
		let bottom2 = this.player2Y + this.playerHeight
		let secondBreak2 = bottom2 - this.playerHeight /5
		if (this.ballY > top2 && this.ballY < bottom2){
			this.ballDirX *= -1
			if (this.ballY < firstBreak2){
				this.ballYSpeed -= 1
			} else if (this.ballY > secondBreak2){
				this.ballYSpeed += 1
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
					<p>-</p>
					<p>{this.state.player2Score}</p>
					</div>
				}
			</div>
			{this.props.numOfPlayers > 1 &&
				<div className="button" onClick={this.resetScores.bind(this)}>
					Reset scores
				</div>
			}
			</div>

		)
	}
}