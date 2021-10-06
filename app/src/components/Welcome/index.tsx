import React from 'react'
import styles from './Welcome.module.css'

import Card from '../Card'

const Index: React.FC = () => {
    const NAME = localStorage.getItem('name')
    return (
        <Card maxHeight={'150px'}>
            <h3>Welcome, {NAME}</h3>
            <div>On this page you can find a list of vendor bills/ credits waiting for your action</div>
        </Card>
    )
}

export default Index;