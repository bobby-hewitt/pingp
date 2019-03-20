import React, { Component } from 'react'
import './style.scss'

export default class InfoBar extends Component {
	render(){
		const { name, playerNumber } = this.props
		return(
			<div className="mobileInfoBar">
				{name && playerNumber &&
				<p className="mobilePlayerInfo">{name} <span>| Player {playerNumber}</span></p>
				}
				{!(name && playerNumber) && 
					<p className="mobilePlayerInfo">test.co</p>
				}
				
			</div>
		)
	}
}