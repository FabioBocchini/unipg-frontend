import React from 'react'
import Header from './Header'
import Content from './Content'
import Footer from './Footer'
import './Components.css'
import { Layout } from 'antd'

// componente di collegamento tra header,content,footer e app
class LayoutComponent extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			stato: 'login',
			utente: null,
			token: null
		}
		this.onLoginExecuted = this.onLoginExecuted.bind(this)
		this.onHomeClick = this.onHomeClick.bind(this)
		this.onBibliotecaClick = this.onBibliotecaClick.bind(this)
		this.onSegreteriaClick = this.onSegreteriaClick.bind(this)
	}

	onLoginExecuted(utente, stato, token) {
		this.setState({ stato, utente, token })
	}

	onHomeClick() {
		this.setState({ stato: 'login' })
	}

	onBibliotecaClick() {
		this.setState({ stato: 'biblioteca' })
	}

	onSegreteriaClick() {
		this.setState({ stato: 'segreteria' })
	}

	render() {
		return (
			<Layout style={{ height: '100vh' }}>
				<Header
					onHomeClick={this.onHomeClick}
					utente={this.state.utente}
					onBibliotecaClick={this.onBibliotecaClick}
					onSegreteriaClick={this.onSegreteriaClick}
				/>
				<Content
					onLoginExecuted={this.onLoginExecuted}
					stato={this.state.stato}
					utente={this.state.utente}
					token={this.state.token}
				/>
				<Footer />
			</Layout>
		)
	}
}

export default LayoutComponent
