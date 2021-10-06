import React from 'react'
import styles from './Navbar.module.css'

const Index: React.FC = () => {
    const Name = localStorage.getItem('name') || "Janne Anttila"

    const onLogOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
    }

    return (
            <nav className={styles.navbar}>
                <a className={styles.logo}>
                    <img src="https://i.imgur.com/QOU164X.png" className={styles.logoIcon}/>
                </a>
                <div className={styles.navLinks}>
                    <div><a className={styles.navElements} href="#" style = {{color: 'green'}}>Pending Approvals</a></div>
                    <div><a className={styles.navElements} href="#">Approval History</a></div>
                    <div><a className={styles.navElements} href="#">{Name}</a></div>
                    <div><a className={styles.navElements} href="/" onClick={onLogOut}>Logout</a></div>
                </div>
            </nav>
    )
}

export default Index;