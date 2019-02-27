import React, { Component } from 'react'
import './style.scss'

export default class Canvas extends Component {

	constructor(props){
		super(props)
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
		this.ballY = window.innerHeight / 2;
		this.ballDirX = 1;
		this.ballDirY = 1;
		this.ballYSpeed = Math.random() < 0.5 ? 5.5 : -5.5
		this.ballXSpeed = Math.random() < 0.5 ? 5.5 : -5.5
		this.state = {
			player1Score: 0,
			player2Score: 0,
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

		this.ballX = window.innerWidth / 2
		this.ballYSpeed = Math.random() < 0.5 ? 5.5 : -5.5
		this.ballXSpeed = Math.random() < 0.5 ? 5.5 : -5.5
	}

	loop(){
		this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
		this.drawBoard()
		this.updateBall()
		if (this.ballX <= this.playerX && this.ballX > this.playerX - this.playerWidth){
			this.checkCollision()
		} else if (this.props.is2Player && this.ballX + this.ballSize >= this.player2X && this.ballX < this.player2X + this.playerWidth){
			console.log('checking player 2 collision')
			this.checkPlayer2Collision()
		}
		this.drawBall()
		this.updatePlayer()
		this.drawPlayer()
		if (this.props.is2Player){
			this.updatePlayer2()
		}
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
		if (this.ballX > window.innerWidth - this.ballSize ){
			if (this.props.is2Player){
				this.setState({player1Score: this.state.player1Score + 1})
				this.setup()
			} else {
				this.ballDirX *= -1
			}
		} else if (this.ballX < 0){
			this.setState({player2Score: this.state.player2Score + 1})
			this.setup()
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
		if (this.props.is2Player){
			var player2 = new Player(this.player2X - this.playerWidth, this.player2Y, this.playerWidth,this.playerHeight);
			player2.draw(this.ctx);
		}
	}

	checkCollision(){
		let top = this.playerY
		let firstBreak = this.playerY + this.playerHeight /5
		let bottom = this.playerY + this.playerHeight
		let secondBreak = bottom - this.playerHeight /5
		if (this.ballY > top && this.ballY < bottom){
			
			this.ballDirX *= -1
			if (this.ballDirX < 0){
				this.ballXSpeed -= 0.5
			} else{
				this.ballXSpeed += 0.5
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

			<canvas ref="canvas" id="canvas" height={window.innerHeight} width={window.innerWidth}>

			</canvas>
			<div className="scores">
			{this.props.is2Player &&
				<p>{this.state.player1Score}-{this.state.player2Score}</p>
			}

			</div>
			{this.props.is2Player &&
				<div className="button" onClick={this.resetScores.bind(this)}>
					Reset scores
				</div>
			}
			</div>

		)
	}
}