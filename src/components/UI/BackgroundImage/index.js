import React, { Component } from 'react'
import './style.scss'
import { Tint } from 'components'
export default class Background extends Component {
	render(){
		const { source, position, tint, isSectionBackground } = this.props
		return(
			<div 
				className={`UI__background-image ${isSectionBackground && 'isSectionBackground'}`} 
				style={{backgroundImage: 'url(' + source + ')'}}>
					{tint && 
						<Tint />
					}
					{this.props.children}
			</div>
		)
	}
}