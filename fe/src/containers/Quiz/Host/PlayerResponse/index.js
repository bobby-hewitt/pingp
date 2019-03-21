import React, { Component } from 'react'
import './style.scss'

export default class PlayrerResponse extends Component {
	render(){
		let correct = this.props.response ? this.props.response.correct : false
		console.log('response', this.props)
		let cn = 'playerResponse'
		if (!this.props.response) cn += ' hidden'
		if (this.props.quizState === 'answer' && !correct) cn += ' animateOut'
		
		return(
			<div className={cn}>
				<p className="playerResponseName">{this.props.name}</p>
				{this.props.bonus && 
					<p className="bonus" >+50</p>
				}
				{correct && this.props.quizState === 'answer' &&
					<p className="correct">+100</p>
				}	
			</div>
		)
	}
}