import React, { Component } from 'react'
import './style.scss'

export default class Flex extends Component {
	render(){
		const { type, justify, align, fill } = this.props
		return(
			<div className={`layout__flex ${type} justify${justify} align${align} fill${fill}`}>
				{this.props.children}
			</div>
		)
	}
}