import React, { Component } from 'react'
import Axios from 'axios'
import './Components.css'
import { Form, Icon, Input, Button, Checkbox } from 'antd'

class LoginComponent extends Component {
	constructor(props) {
		super(props)

		this.state = {
			email: '',
			password: '',
			profCheck: false
		}

		this.handleLoginClick = this.handleLoginClick.bind(this)
		this.handleRegisterClick = this.handleRegisterClick.bind(this)
	}

	// controllo se l' email è presente nel database e se la password coincide
	checkLoginInfoStudente(email, password) {
		debugger
		Axios.post('http://localhost:3001/studenti/login', { email, password })
			.then((res) => {
				this.props.onLoginExecuted(res.data.user, 'studente', res.data.token)
			})
			.catch((error) => alert('Email o Password Errata!'))
	}

	checkLoginInfoProfessore(email, password) {
		Axios.post('http://localhost:3001/professori/login', { email, password })
			.then((res) => {
				console.log(res.data)
				this.props.onLoginExecuted(res.data.user, 'professore', res.data.token)
			})
			.catch((error) => alert('Email o Password Errata!'))
	}

	handleLoginClick() {
		if (this.state.profCheck === false) this.checkLoginInfoStudente(this.state.email, this.state.password)
		else this.checkLoginInfoProfessore(this.state.email, this.state.password)
	}

	handleRegisterClick() {
		this.props.onLoginExecuted(null, 'register', null)
	}

	render() {
		const { getFieldDecorator } = this.props.form
		return (
			<Form onSubmit={this.handleSubmit} className="login-form">
				<Form.Item>
					{getFieldDecorator('email', {
						rules: [ { required: true, message: 'Inserisci la tua Email!' } ]
					})(
						<Input
							prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
							placeholder="Email"
							onChange={(e) => this.setState({ email: e.target.value })}
						/>
					)}
				</Form.Item>
				<Form.Item>
					{getFieldDecorator('password', {
						rules: [ { required: true, message: 'Inserisci la tua Password!' } ]
					})(
						<Input
							prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
							type="password"
							placeholder="Password"
							onChange={(e) => this.setState({ password: e.target.value })}
						/>
					)}
				</Form.Item>
				<Form.Item>
					<Checkbox
						checked={this.state.profCheck}
						onChange={(e) => {
							this.setState({ profCheck: e.target.checked })
						}}
						style={{ float: 'left' }}
					>
						Login come Professore
					</Checkbox>
					<Button
						type="primary"
						htmlType="submit"
						className="login-form-button"
						onClick={this.handleLoginClick}
					>
						Log in
					</Button>
					Oppure{' '}
					<Button type="link" onClick={this.handleRegisterClick}>
						registrati adesso!
					</Button>
				</Form.Item>
			</Form>
		)
	}
}

export default Form.create()(LoginComponent)
