import React, { Component } from 'react'
import './style.scss'
import { BackgroundImage } from 'components' 

export default class Section extends Component {
	render(){
		const { children, backgroundImage, backgroundTint, style } = this.props
		return(
			<div className={`layout__section`} style={style ? style : {}}>
				{backgroundImage && 
					<BackgroundImage isSectionBackground source={backgroundImage} tint={backgroundTint}/>
				}
				{children}
			</div>
		)
	}
}