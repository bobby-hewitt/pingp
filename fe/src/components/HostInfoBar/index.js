import React, { Component } from 'react'
import './style.scss'

export default class InfoBar extends Component {
	render(){
		const { roomCode  } = this.props
		return(
			<div className="infoBar">
				<div className="falseBackground" />
				<p className="roomCode">{roomCode}</p>
				<div className="hostInfoPlayersContainer">
				{/*this.props.players.map((p, i) => {
					return(
						<div className={`player player${i} ${p && ' connected'}`}>
						</div>
					)
				})*/}
				</div>
			</div>
		)
	}
}