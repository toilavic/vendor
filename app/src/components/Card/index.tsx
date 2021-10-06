import React from 'react'
import styles from './Card.module.css'

interface Props {
    maxHeight?: string,
    children: React.ReactNode;
}

const Index: React.FC<Props> = ({
    maxHeight,
    children
}) => {
    const NAME = localStorage.getItem('name')
    return (
        <div className={styles.container} style={{maxHeight}}>
            {children}
        </div>
    )
}

export default Index;