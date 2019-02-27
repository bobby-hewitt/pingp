import React, { Component } from 'react'
import './style.scss'

export default class TextInput extends Component {

	constructor(props){
		super(props)
		this.state ={
			hasFocus: false
		}
	}

	toggleFocus(hasFocus){
		this.setState({hasFocus})
	}

	render(){
		const { type, placeholder, value, secondary } = this.props
		return(
			<div className={`interactions__textinput ${secondary && 'secondary'} ${this.state.hasFocus && 'hasFocus'}`}>
				<div className="focus" />
				<input 
					ref="input" 
					type={type} 
					placeholder={placeholder} 
					value={value} 
					placeholder={placeholder}
					onFocus={this.toggleFocus.bind(this, true)}
					onBlur={this.toggleFocus.bind(this, false)}
				/>
			</div>
		)
	}
}