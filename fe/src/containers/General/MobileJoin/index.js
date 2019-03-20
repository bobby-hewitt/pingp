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
		super(props)
		this.state = {
			isSubmitting: false,
			code: this.props.match ? this.props.match.params.code.toUpperCase()  : window.location.pathname.split('/')[2] ? window.location.pathname.split('/')[2].toUpperCase() : '',
			name: ''
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