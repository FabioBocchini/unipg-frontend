import React from 'react'
import Login from './Login'
import Register from './Register'
import Professore from './Professore'
import Studente from './Studente'
import logo from '../img/logo.png'
import './Components.css'
import { Layout, Breadcrumb } from 'antd'

const { Content } = Layout

// componente che gestisce quale pagina visualizzare tramite props.stato
class ContentComponent extends React.Component {
	render() {
		if (this.props.stato === 'login') {
			return (
				<Layout>
					<Content style={{ padding: '0 50px', marginTop: 64 }}>
						<Breadcrumb style={{ margin: '16px 0' }}>
							<Breadcrumb.Item>UniPG</Breadcrumb.Item>
							<Breadcrumb.Item>Login</Breadcrumb.Item>
						</Breadcrumb>
						<div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
							<div class="log" style={{ margin: '2%' }}>
								<Login onLoginExecuted={this.props.onLoginExecuted} />
								<img class="logo" src={logo} alt="" style={{ width: '15%' }} />
							</div>
						</div>
					</Content>
				</Layout>
			)
		} else if (this.props.stato === 'register') {
			return (
				<Layout>
					<Content style={{ padding: '0 50px', marginTop: 64 }}>
						<Breadcrumb style={{ margin: '16px 0' }}>
							<Breadcrumb.Item>UniPG</Breadcrumb.Item>
							<Breadcrumb.Item>Registrazione</Breadcrumb.Item>
						</Breadcrumb>
						<div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
							<Register onLoginExecuted={this.props.onLoginExecuted} />
						</div>
					</Content>
				</Layout>
			)
		} else if (this.props.stato === 'studente') {
			return (
				<Layout>
					<Content style={{ padding: '0 50px', marginTop: 64 }}>
						<Breadcrumb style={{ margin: '16px 0' }}>
							<Breadcrumb.Item>UniPG</Breadcrumb.Item>
							<Breadcrumb.Item>Riepilogo Voti</Breadcrumb.Item>
						</Breadcrumb>
						<div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
							<Studente utente={this.props.utente} token={this.props.token} />
						</div>
					</Content>
				</Layout>
			)
		} else if (this.props.stato === 'professore') {
			return (
				<Layout>
					<Content style={{ padding: '0 50px', marginTop: 64 }}>
						<Breadcrumb style={{ margin: '16px 0' }}>
							<Breadcrumb.Item>UniPG</Breadcrumb.Item>
							<Breadcrumb.Item>Aggiunta Voti</Breadcrumb.Item>
						</Breadcrumb>
						<div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
							<Professore utente={this.props.utente} token={this.props.token} />
						</div>
					</Content>
				</Layout>
			)
		} else if (this.props.stato === 'segreteria') {
			return (
				<Layout>
					<Content style={{ padding: '0 50px', marginTop: 64 }}>
						<Breadcrumb style={{ margin: '16px 0' }}>
							<Breadcrumb.Item>UniPG</Breadcrumb.Item>
							<Breadcrumb.Item>Segreteria</Breadcrumb.Item>
						</Breadcrumb>
						<div style={{ background: '#fff', padding: 24, minHeight: 5 }}>
							<form class="info">
								<div style={{ background: '#fff', padding: 24, minHeight: 5 }}>
									<h1>
										<b>Informazioni Segreteria:</b> Dipartimento di matematica e informatica
									</h1>
								</div>

								<div style={{ background: '#fff', padding: 24, minHeight: 5 }}>
									<h4>
										<b>-Indirizzo:</b> Via L. Vanvitelli, 1 06123 Perugia{' '}
									</h4>
								</div>

								<div style={{ background: '#fff', padding: 24, minHeight: 5 }}>
									<h4>
										<b>-Ufficio:</b> IV Piano{' '}
									</h4>
								</div>

								<div style={{ background: '#fff', padding: 24, minHeight: 5 }}>
									<h4>
										<b>-Tel:</b> 075 585 5071
									</h4>
								</div>

								<div style={{ background: '#fff', padding: 24, minHeight: 5 }}>
									<h4>
										<b>-Fax:</b> 075 585 5024
									</h4>
								</div>

								<div style={{ background: '#fff', padding: 24, minHeight: 5 }}>
									<h4>
										<b>-Email:</b>{' '}
										<a href="segr-didattica.mat.dmi@unipg.it"> segr-didattica.mat.dmi@unipg.it </a>
									</h4>
								</div>
							</form>
						</div>
					</Content>
				</Layout>
			)
		} else if (this.props.stato === 'biblioteca') {
			return (
				<Layout>
					<Content style={{ padding: '0 50px', marginTop: 64 }}>
						<Breadcrumb style={{ margin: '16px 0' }}>
							<Breadcrumb.Item>UniPG</Breadcrumb.Item>
							<Breadcrumb.Item>Biblioteca</Breadcrumb.Item>
						</Breadcrumb>
						<div style={{ background: '#fff', padding: 24, minHeight: 5 }}>
							<form class="info">
								<div style={{ background: '#fff', padding: 24, minHeight: 5 }}>
									<h1>
										<b>Informazioni Biblioteca:</b> Dipartimento di matematica e informatica
									</h1>
								</div>

								<div style={{ background: '#fff', padding: 24, minHeight: 5 }}>
									<h4>
										<b>-Indirizzo:</b> Via L. Vanvitelli, 1 06123 Perugia{' '}
									</h4>
								</div>

								<div style={{ background: '#fff', padding: 24, minHeight: 5 }}>
									<h4>
										<b>-Ufficio:</b> IV Piano{' '}
									</h4>
								</div>

								<div style={{ background: '#fff', padding: 24, minHeight: 5 }}>
									<h4>
										<b>-Tel:</b> 075.585.5026/5027
									</h4>
								</div>

								<div style={{ background: '#fff', padding: 24, minHeight: 5 }}>
									<h4>
										<b>-Fax:</b> 075.585.5965
									</h4>
								</div>
							</form>
						</div>
					</Content>
				</Layout>
			)
		} else {
			return <div>Errore Caricamento Pagina</div>
		}
	}
}

export default ContentComponent
