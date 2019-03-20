import React, { Component } from 'react'
import './style.scss'

export default class Button extends Component {
	render(){
		return(
			<div className={`button ${this.props.align}`} onClick={this.props.onClick}>
				
				<p className={this.props.waiting ? 'transparent' : ''}>{this.props.text}</p>
				
				{this.props.waiting &&
					<img className="loadingSpinner" src="https://upload.wikimedia.org/wikipedia/commons/a/ad/YouTube_loading_symbol_3_%28transparent%29.gif" alt="Loading spinner" />
				}
			</div>

		)
	}
}