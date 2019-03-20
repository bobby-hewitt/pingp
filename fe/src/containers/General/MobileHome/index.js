import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import './style.scss'
import games from 'config/games'
import Button from 'components/Button'
import { chooseGame } from 'sockets/player'
class MobileHome extends Component {

	onClick(slug){
		const data = {
			room: this.props.room,
			game: slug
		}
		console.log(this.props.socket)
		chooseGame(data, this.props.socket)
		this.props.push(`/m/${slug}`)
	}

	render(){
		return(
			<div className="mobileHomeContainer">
				<div  className="mobileOptionsContainer">
					<p className="mobileHomeInstructions">Select a game to start playing</p>
					{games && games.map((game, i) => {
						return(
							<Button key={i} onClick={this.onClick.bind(this, game.slug)} text={game.name} />		
						)
					})}
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	room: state.generalPlayer ? state.generalPlayer.room : '',
	name: state.generalPlayer ? state.generalPlayer.name: '',
	playerNumber: state.generalPlayer ? state.generalPlayer.playerNumber : '',
	router: state.router
})

const mapDispatchToProps = dispatch => bindActionCreators({
  push: (path) => push(path),
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MobileHome)