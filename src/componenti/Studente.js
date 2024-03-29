import React from 'react'
import { Table, Divider } from 'antd'
import Axios from 'axios'
import moment from 'moment'
import { Button } from 'antd'

const { Column } = Table

class Studente extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			data: null,
			token: null
		}
	}

	componentDidMount() {
		this.getEsami()
	}

	// prendo dal database la lista degli esami della matricola che ha effettuato il login
	getEsami() {
		const { matricola } = this.props.utente
		const token = this.props.token
		console.log(token)
		Axios.get('http://localhost:3001/studenti/esami/' + matricola, {
			headers: { Authorization: 'Bearer ' + token }
		})
			.then((res) => this.setState({ data: res.data }))
			.catch((err) => console.log(err))
	}

	// modifico l'esame nel database mettendo lo stato ad 'Accettato
	accettaEsame(corso) {
		const token = this.props.token
		const data = {
			matricola: this.props.utente.matricola,
			corso: corso
		}
		const config = {
			headers: { Authorization: 'bearer ' + token }
		}
		Axios.put('http://localhost:3001/studenti/esami/', data, config)
			.then((res) => this.getEsami())
			.catch((err) => console.log(err))
	}

	// rifiuto l'esame e quindi elimino la riga dal database
	rifiutaEsame(corso) {
		const token = this.props.token
		const { matricola } = this.props.utente
		Axios.delete('http://localhost:3001/studenti/esami/' + corso + '/' + matricola, {
			headers: { Authorization: 'Bearer ' + token }
		})
			.then((res) => this.getEsami())
			.catch((err) => console.log(err))
	}

	render() {
		if (!this.state.data) {
			return (
				<div>
					<Table dataSource={null}>
						<Column title="Esame" dataIndex="esame" key="esame" />
						<Column title="Professore" dataIndex="professore" key="professore" />
						<Column title="Data" dataIndex="dataesametext" key="data" />
						<Column title="Voto" dataIndex="voto" key="voto" />
						<Column title="Stato" dataIndex="voto" key="stato" />
					</Table>
				</div>
			)
		}

		const data = this.state.data.map((item) => ({
			...item,
			dataesametext: moment(item.dataesame).format('DD/MM/YYYY'),
			professore: item.cognome + ' ' + item.nome,
			key: item.id_corso
		}))

		return (
			<Table dataSource={data}>
				<Column title="Esame" dataIndex="esame" key="esame" />
				<Column title="Professore" dataIndex="professore" key="professore" />
				<Column title="Data" dataIndex="dataesametext" key="data" />
				<Column title="Voto" dataIndex="voto" key="voto" />

				<Column
					title="Stato"
					key="action"
					render={(text, record) => {
						if (record.statoesame === 'Waiting') {
							return (
								<span>
									<Button type="link" onClick={() => this.accettaEsame(record.id_corso)}>
										Accetta
									</Button>
									<Divider type="vertical" />
									<Button type="link" onClick={() => this.rifiutaEsame(record.id_corso)}>
										Rifiuta
									</Button>
								</span>
							)
						}
						return <span>Accettato</span>
					}}
				/>
			</Table>
		)
	}
}

export default Studente
