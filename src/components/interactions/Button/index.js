import React, { Component } from 'react'
import './style.scss'

export default class extends Component {
	render(){
		const { secondary, inactive, copy, action } = this.props
		return(
			<div 
				onClick={() => action()}
				className={`interaction__button ${secondary && 'secondary'} ${inactive && 'inactive'}`}
			>
			<p>{copy}</p>
				<div className="fill">
				
				</div>
			</div>
		)
	}
}