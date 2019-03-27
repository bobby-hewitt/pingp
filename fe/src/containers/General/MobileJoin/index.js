import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { joinRoom } from 'sockets/player'
import Button from 'components/Button'
import TextInput from 'components/TextInput'
import './style.scss'

class MobileJoin extends Component {

	constructor(props){

		function getPrevious(){
			if (window.localStorage && window.localStorage.getItem('pingp')){
				return JSON.parse(window.localStorage.getItem('pingp'))
			} else {
				return null
			}
		}

		// getCode(){
		// 	console.log(this)
		// 	if (this.props.match){
		// 		return this.props.match.params.code.toUpperCase()
		// 	} else if ( window.location.pathname.split('/')[2]){
		// 		return window.location.pathname.split('/')[2].toUpperCase()	
		// 	} else if (window.localStorage && window.localStorage.getItem('pingp')){
		// 		return JSON.parse(window.localStorage.getItem('pingp')).room
		// 	} else {
		// 		return ''
		// 	}
		// }

		function getName(){
			if (window.localStorage && window.localStorage.getItem('pingp')){
				return JSON.parse(window.localStorage.getItem('pingp')).name
			} else {
				return ''
			}
		}

		super(props)
		this.previous = getPrevious()
		this.state = {
			isSubmitting: false,
			code: this.getCode(),
			name: getName()
		}
	}

	getCode(){
		console.log(this)
		if (this.props.match){
			return this.props.match.params.code.toUpperCase()
		} else if ( window.location.pathname.split('/')[2]){
			return window.location.pathname.split('/')[2].toUpperCase()	
		} else if (window.localStorage && window.localStorage.getItem('pingp')){
			return JSON.parse(window.localStorage.getItem('pingp')).room
		} else {
			return ''
		}
	}

	onChange(nothing, key, e){
		this.setState({
			[key]: e.target.value ? e.target.value.toUpperCase() : ''
		})
	}

	onSubmit(){
		this.setState({isSubmitting: true})
		if (this.state.code){
			let obj = {
		      name: this.state.name,
		      room: this.state.code
		    }
		    if (window.localStorage){
		    	window.localStorage.setItem('pingp', JSON.stringify(obj))
			}
		    joinRoom(obj, this, this.props.socket)
		}
	}

	render(){ 
		return(
				<div className="mobileFormContainer">
					<TextInput label="Room code" name="code" value={this.state.code} onChange={this.onChange.bind(this, 'code')}/>
					<TextInput label="Name" name="name"value={this.state.name} onChange={this.onChange.bind(this, 'name')}/>
					<Button align="right" text="Let's go" onClick={this.onSubmit.bind(this)} waiting={this.state.isSubmitting}/>
				</div>

		)
	}
}



const mapStateToProps = state => ({
	router: state.router
})

const mapDispatchToProps = dispatch => bindActionCreators({
  push: (path) => push(path),
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MobileJoin)