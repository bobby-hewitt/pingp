import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import data from './data'
import Item from './Item'
import './style.scss'

class Home extends Component {
	render(){
		return(
			<div className="homeContainer">
				{data && data.map((route,i) => {
					return(
						<Item {...route} key={i} />
					)
				})}
			</div>
		)
	}
}



const mapDispatchToProps = dispatch => bindActionCreators({
  push: (path) => push(path),
}, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(Home)