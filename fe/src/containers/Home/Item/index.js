import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import './style.scss'

class Item extends Component {
	render(){
		return(
			<div className="homeItemContainer" onClick={this.props.push.bind(this, this.props.link)}>
				<h1>{this.props.name}</h1>
				<p>{this.props.description}</p>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	
})

const mapDispatchToProps = dispatch => bindActionCreators({
  push: (path) => push(path),
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Item)