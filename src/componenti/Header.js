import React from 'react'
import './Components.css'
import { Layout, Menu } from 'antd'

const { Header } = Layout

class HeaderComponent extends React.Component {
	constructor(props) {
		super(props)

		this.handleLogoutClick = this.handleLogoutClick.bind(this)
		this.handleBibliotecaClick = this.handleBibliotecaClick.bind(this)
		this.handleSegreteriaClick = this.handleSegreteriaClick.bind(this)
	}

	handleLogoutClick() {
		if (this.props.utente) this.props.utente.nome = ''
		this.props.onHomeClick()
	}

	handleSegreteriaClick() {
		if (this.props.utente) this.props.utente.nome = ''
		this.props.onSegreteriaClick()
	}

	handleBibliotecaClick() {
		if (this.props.utente) this.props.utente.nome = ''
		this.props.onBibliotecaClick()
	}

	render() {
		const title = this.props.utente
			? 'Benvenuto ' + this.props.utente.nome.charAt(0).toUpperCase() + this.props.utente.nome.slice(1)
			: 'Benvenuto'

		return (
			<Layout>
				<Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
					<div className="logo">
						<p
							style={{
								top: '50%',
								position: 'absolute',
								margin: 0,
								textAlign: 'center',
								transform: 'translateY(-50%)'
							}}
						>
							UniPG
						</p>
					</div>
					<div className="title">{title}</div>
					<Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }}>
						<Menu.Item key="1" style={{ float: 'right' }} onClick={this.handleLogoutClick}>
							Home
						</Menu.Item>
						<Menu.Item key="2" style={{ float: 'right' }} onClick={this.handleSegreteriaClick}>
							Segreteria
						</Menu.Item>

						<Menu.Item key="3" style={{ float: 'right' }} onClick={this.handleBibliotecaClick}>
							Biblioteca
						</Menu.Item>
					</Menu>
				</Header>
			</Layout>
		)
	}
}

export default HeaderComponent
