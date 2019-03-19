import React, { Component } from 'react'
import './style.scss'

export default class InfoBar extends Component {
	render(){
		const { roomCode, players } = this.props
		return(
			<div className="infoBar">
				<p className="roomCode"><span>Room code: </span> {roomCode}</p>
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