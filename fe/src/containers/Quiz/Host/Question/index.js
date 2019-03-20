import React, { Component } from 'react'
import './style.scss'

export default class Question extends Component {
	render(){
		return(

			<div className="questionContainer">
				<div className="question">
				<p >{this.props.question ? unescape(this.props.question.question): ''}</p>
				</div>
				
			</div>
		)
	}
}