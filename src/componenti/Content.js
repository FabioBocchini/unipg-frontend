import React from "react"
import Login from "./Login"
import Register from "./Register"
import Professore from "./Professore"
import Studente from "./Studente"
import './Components.css'
import { Layout, Breadcrumb } from 'antd'

const {Content} = Layout

class ContentComponent extends React.Component {


    render(){
        if (this.props.stato === "login") {
            return(
                <Layout>
                    <Content style={{ padding: '0 50px', marginTop: 64 }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>UniPG</Breadcrumb.Item>
                        <Breadcrumb.Item>Login</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
                        <Login onLoginExecuted={this.props.onLoginExecuted}/>
                    </div>
                    </Content>
                </Layout> 
            )
        } else if (this.props.stato === "register"){
            return(
                <Layout>
                    <Content style={{ padding: '0 50px', marginTop: 64 }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>UniPG</Breadcrumb.Item>
                        <Breadcrumb.Item>Registrazione</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
                        <Register onLoginExecuted={this.props.onLoginExecuted}/>
                    </div>
                    </Content>
                </Layout> 
            ) 
        } else if (this.props.stato === "studente"){
            return(
                <Layout>
                    <Content style={{ padding: '0 50px', marginTop: 64 }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>UniPG</Breadcrumb.Item>
                        <Breadcrumb.Item>Riepilogo Voti</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
                        <Studente utente={this.props.utente}/>
                    </div>
                    </Content>
                </Layout> 
            )
        }else if (this.props.stato === "professore"){
            return(
                <Layout>
                    <Content style={{ padding: '0 50px', marginTop: 64 }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>UniPG</Breadcrumb.Item>
                        <Breadcrumb.Item>Aggiunta Voti</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
                        <Professore utente={this.props.utente}/>
                    </div>
                    </Content>
                </Layout> 
            )
        } else {
            return(
                <div>
                    Errore Caricamento Pagina
                </div>
            )
        }
    }
}

export default ContentComponent