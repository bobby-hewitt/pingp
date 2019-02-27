import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './style.scss'
import SocketListener from '../SocketListener'
import { joinRoom, sendOrientation } from '../../sockets/player'
import { setSelf  } from '../../actions/player'


class Mobile extends Component {

	constructor(props){
		super(props)
		this.state = {
			xDir: 0,
			yDir: 0,
		}
	}

	componentWillMount(){
		let code = window.location.pathname.split('/')[2]
		if (code){
			let obj = {
		      name: '',
		      room: code.toUpperCase()
		    }
		    joinRoom(obj, this)
		}

	}

	componentWillReceiveProps(np){
		if (np.playerNumber === null && this.props.playerNumber !== null){
			this.props.push('/not-found')
		}
	}

	componentDidMount(){
	// if (this.props.playerNumber === null){
	// 		this.props.push('/not-found')
	// 	}	
		window.addEventListener('deviceorientation', (orientation) => {
			let y = this.findLimit(orientation.beta)
			
			if (y !== this.state.yDir){				
				let dirs = {
					y: y,
					playerNumber: this.props.playerNumber
				}
				console.log('sending oritentation', y)
				sendOrientation(dirs, this)
				this.setState({yDir: y})
			}
		})
	}

	findLimit(coord){
		if (coord < -47.5) return -10
		else if (coord < -42.5) return -9
		else if (coord < -37.5) return -8
		else if (coord < -32.5) return -7
		else if (coord < -27.5) return -6
		else if (coord < -22.5) return -5
		else if (coord < -17.5) return -4
		else if (coord < -12.5) return -3
		else if (coord < -7.5) return -2
		else if (coord < -2.5) return -1
		else if (coord < 2.5) return 0
		else if (coord < 7.5) return 1
		else if (coord < 12.5) return 2
		else if (coord < 17.5 ) return 3
		else if (coord < 22.5 ) return 4
		else if (coord < 27.5 ) return 5
		else if (coord < 32.5 ) return 6
		else if (coord < 37.5 ) return 7
		else if (coord < 42.5 ) return 8
		else if (coord < 47.5 ) return 9
		else return 10
	}

	render(){
		return(
			<div className="mobile">
				<SocketListener />
				<div style={{transform: 'translateY(' + this.state.yDir * 5 + 'px)'}}>
				<h3>Player {JSON.stringify(this.props.playerNumber)}</h3>
				<p >Tilt phone to control paddle</p>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	router: state.router,
	room: state.player.room,
	playerNumber: state.player.playerNumber
})

const mapDispatchToProps = dispatch => bindActionCreators({
  push: (path) => push(path),
  setSelf
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Mobile)