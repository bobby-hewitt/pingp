import React, { Component } from 'react'
import './style.scss'

export default class TextInput extends Component {
	render(){
		return(
			<div>
			<p className="formLabel">{this.props.label} </p>
			<input className="textInput" type="text" name={this.props.name} value={this.props.value} onChange={this.props.onChange.bind(this, this.props.name)}/>
			</div>
		)
	}
}