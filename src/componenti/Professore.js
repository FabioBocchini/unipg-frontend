import React from 'react'
import { Form, InputNumber, Button, DatePicker, Select, Spin } from 'antd'
import Axios from 'axios'

const { Option } = Select

class Professore extends React.Component {
	state = {
		confirmDirty: false
	}

	constructor(props) {
		super(props)

		this.state = {
			data: [],
			selectedCorso: null,
			selectedStud: null,
			studenti: [],
			voto: '',
			giorno: null,
			loading: false
		}
		this.handleDataChange = this.handleDataChange.bind(this)
	}

	componentDidMount() {
		this.getEsami()
		this.getStudenti()
	}

	// inserisco il voto nel database, nella tabella 'esame'
	postVoto() {
		const corso = this.state.selectedCorso
		const matricola = this.state.selectedStud
		const voto = this.state.voto
		const giorno = this.state.giorno

		Axios.post('http://localhost:3001/esami/nuovo', {
			corso,
			matricola,
			voto,
			giorno
		})
			.then((res) => {
				alert('Voto inserito con successo!')
			})
			.catch((err) => {
				console.log(err)
				alert('Esame già presente')
			})
			.finally(() => {
				this.setState({ loading: false })
			})
	}

	// cerco la lista degli esami e degli studenti nel database per mostrarli nei menù
	getEsami() {
		const { id } = this.props.utente
		Axios.get('http://localhost:3001/corsi/' + id, {}).then((res) => this.setState({ data: res.data }))
	}
	getStudenti() {
		Axios.get('http://localhost:3001/studenti', {})
			.then((res) => this.setState({ studenti: res.data }))
			.catch((err) => console.log(err))
	}

	validateVoto(voto) {
		if (voto >= 18 && voto <= 30) {
			this.setState({ voto })
			return {
				validateStatus: 'success',
				errorMsg: null
			}
		}
		return {
			validateStatus: 'error',
			errorMsg: 'Inserisci un Voto corretto!'
		}
	}

	handleNumberChange = (value) => {
		this.setState({
			voto: this.validateVoto(value)
		})
	}

	handleDataChange(date, giorno) {
		this.setState({ giorno })
	}

	handleInserisciVoto = () => {
		if (this.state.selectedCorso && this.state.selectedStud && this.state.voto && this.state.giorno) {
			this.setState({ loading: true })
			this.postVoto()
		}
	}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values)
			}
		})
	}

	handleConfirmBlur = (e) => {
		const { value } = e.target
		this.setState({ confirmDirty: this.state.confirmDirty || !!value })
	}

	menuCorsi() {
		return this.state.data.map((item, key) => (
			<Option key={key} value={item.id_corso}>
				{item.nome}
			</Option>
		))
	}

	menuStudenti() {
		return this.state.studenti.map((item, key) => (
			<Option key={key} value={item.matricola}>
				{item.matricola}
			</Option>
		))
	}

	render() {
		const { getFieldDecorator } = this.props.form
		const { voto } = this.state
		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 8 }
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 8 }
			}
		}
		const tailFormItemLayout = {
			wrapperCol: {
				xs: {
					span: 24,
					offset: 0
				},
				sm: {
					span: 16,
					offset: 8
				}
			}
		}
		const config = {
			rules: [ { type: 'object', required: true, message: 'Inserisci la Data!' } ]
		}
		if (this.state.loading) {
			return (
				<div style={{ marginLeft: '50%', marginTop: '10%' }}>
					<Spin size="large" />
				</div>
			)
		} else {
			return (
				<Form {...formItemLayout} onSubmit={this.handleSubmit}>
					<Form.Item label="Corso">
						{getFieldDecorator('corso', {
							rules: [ { type: 'string', required: true, message: 'Inserisci il nome del Corso!' } ]
						})(
							<Select
								style={{ width: 200 }}
								placeholder="Seleziona un corso"
								onSelect={(selectedCorso) => {
									this.setState({ selectedCorso })
								}}
								setFieldValue={this.state.selectedStud}
								filterOption={(input, option) =>
									option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
							>
								{this.menuCorsi()}
							</Select>
						)}
					</Form.Item>

					<Form.Item label="Studente">
						{getFieldDecorator('studente', {
							rules: [ { type: 'integer', required: true, message: 'Inserisci lo Studente!' } ]
						})(
							<Select
								style={{ width: 200 }}
								placeholder="Seleziona uno studente"
								onSelect={(selectedStud) => {
									this.setState({ selectedStud })
								}}
								setFieldValue={this.state.selectedStud}
								filterOption={(input, option) =>
									option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
							>
								{this.menuStudenti()}
							</Select>
						)}
					</Form.Item>

					<Form.Item
						{...formItemLayout}
						required="true"
						label="Voto"
						validateStatus={voto.validateStatus}
						help={voto.errorMsg}
					>
						<InputNumber min={18} max={30} onChange={(value) => this.setState({ voto: value })} />
					</Form.Item>

					<Form.Item label="Data">
						{getFieldDecorator('date-picker', config)(
							<DatePicker setValue={this.state.giorno} onChange={this.handleDataChange} />
						)}
					</Form.Item>

					<Form.Item {...tailFormItemLayout}>
						<Button type="primary" htmlType="submit" onClick={this.handleInserisciVoto}>
							Inserisci Voto
						</Button>
					</Form.Item>
				</Form>
			)
		}
	}
}

export default Form.create()(Professore)
