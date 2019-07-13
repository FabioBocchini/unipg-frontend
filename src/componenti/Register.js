import React, { Component } from "react"
import {
    Form,
    Input,
    Checkbox,
    Button,
  } from 'antd'
import Axios from "axios";

class Register extends Component {
    state = {
        confirmDirty: false,
        email: '',
        matricola: '',
        nome: '',
        cognome: '',
        password: ''
      }


      postStudente(){
        const {matricola} = this.state
        const {nome} = this.state
        const {cognome} = this.state
        const {email} = this.state
        const {password} = this.state

        Axios.post("http://localhost:3001/studenti/nuovo",{matricola, nome, cognome, email, password})
        this.props.onLoginExecuted(this.state,"studente")
      } 

      checkExisting(){
        const {email} = this.state
        const {matricola} = this.state
        Axios.post("http://localhost:3001/studenti/email",{email, matricola})
        .then( res => {
            this.postStudente()
        })
        .catch( error => alert("Email o Matricola già esistenti!"))
      }
      


      handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            if(values.agreement)
              this.checkExisting()
            else  
              alert("Accetta i Termini prima di roseguire")
          }
        })
      }
    
      handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
      };
    
      compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
          callback('Le due Password non coincidono!');
        } else {
          callback();
        }
      };
    
      validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      };
    
      render() {
        const { getFieldDecorator } = this.props.form;
    
        const formItemLayout = {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 8 },
          },
        };
        const tailFormItemLayout = {
          wrapperCol: {
            xs: {
              span: 24,
              offset: 0,
            },
            sm: {
              span: 16,
              offset: 8,
            },
          },
        }
    
        return (
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label="E-mail">
              {getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    message: 'Non è una email Valida!',
                  },
                  {
                    required: true,
                    message: 'Inserisci la tua Email!',
                  },
                ],
              })(
              <Input 
                onChange={e => this.setState({email: e.target.value})}
              />)}
            </Form.Item>
            <Form.Item label="Matricola">
              {getFieldDecorator('matricola', {
                rules: [
                  {
                    type: 'string',
                    message: 'Non è una Matricola valida!',
                  },
                  {
                    required: true,
                    message: 'Inserisci il tuo numero di Matricola',
                  },
                ],
              })(<Input 
                  onChange={e => this.setState({matricola: e.target.value})}
                />)}
            </Form.Item>
            <Form.Item label="Nome">
              {getFieldDecorator('nome', {
              })(<Input
                onChange={e => this.setState({nome: e.target.value})} />)}
            </Form.Item>
            <Form.Item label="Cognome">
              {getFieldDecorator('cognome', {
              })(<Input
                onChange={e => this.setState({cognome: e.target.value})} />)}
            </Form.Item>
            <Form.Item label="Password" hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Inserisci la tua Password!',
                  },
                  {
                    validator: this.validateToNextPassword,
                  },
                ],
              })(<Input.Password
                onChange={e => this.setState({password: e.target.value})} />)}
            </Form.Item>
            <Form.Item label="Confirm Password" hasFeedback>
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: 'Conferma la tua Password!',
                  },
                  {
                    validator: this.compareToFirstPassword,
                  },
                ],
              })(<Input.Password onBlur={this.handleConfirmBlur} />)}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              {getFieldDecorator('agreement', {
                valuePropName: 'checked',
              })(
                <Checkbox>
                  Ho letto i  <a href="https://policies.google.com/terms?hl=en-US" target="_blank">Termini e Condizioni</a>
                </Checkbox>,
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button 
                type="primary" 
                htmlType="submit">
                Registrati
              </Button>
            </Form.Item>
          </Form>
        );
      }
}

export default Form.create() (Register)