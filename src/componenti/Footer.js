import React from 'react'
import './Components.css'
import { Layout } from 'antd'

const { Footer } = Layout

const FooterComponent = (props) => {
	return (
		<Layout>
			<Footer style={{ textAlign: 'center' }}>Università degli Studi di Perugia @2019</Footer>
		</Layout>
	)
}

export default FooterComponent
