import React, { Component } from 'react'
import './style.scss'

export default class Line extends Component {
	render(){
		const { extended, secondary } = this.props
		return(
			<div className={`UI__line ${extended && 'extended'} ${secondary && 'secondary'}`} />
		)
	}
}