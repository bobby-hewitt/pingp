import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './style.scss'
import SocketListener from '../SocketListener'
import Canvas from 'components/canvas'

class Home extends Component {


	constructor(props){
		super(props)
		this.speed = 1
		this.state = {
			yDir: 0,
			yDir2: 0,
			is2Player: false,
		}
	}

	componentWillReceiveProps(np){
		if (this.state.yDir !== np.coords.y){
			console.warn('new dirs player 1', np.coords)
			this.setState({yDir:np.coords.y})
		}
		if (this.state.yDir2 !== np.coords2.y){

			console.warn('new dirs player 2', np.coords)
			this.setState({yDir2:np.coords2.y, is2Player:true})
		}
	}

	render(){
		return(
			<div className="home">
				<SocketListener isHost/>
				<Canvas 
					yDir={this.state.yDir}
					yDir2={this.state.yDir2}
					is2Player={this.state.is2Player}/>
				<p className="code">www.pingp.co/m/{this.props.roomCode ? this.props.roomCode.toLowerCase() : ''}</p>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	roomCode: state.host.roomCode,
	coords: state.host.coords,
	coords2: state.host.coords2
})

const mapDispatchToProps = dispatch => bindActionCreators({
  push: (path) => push(path)
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)