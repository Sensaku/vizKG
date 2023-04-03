import React from 'react';
import styles from "./Navbar.module.css";

const Navbar = () => {
    return <section className={styles['section-menu']}>
        <div className={styles.logo}><h2>viz-KG</h2></div>
        <div className={styles.menu}>
            <ul className={styles["ul-menu"]}>
                <li className={styles['li-menu']}>Menu 1</li>
                <li className={styles['li-menu']}>Menu 2</li>
                <li className={styles['li-menu']}>Menu 3</li>
            </ul>
        </div>
    </section>
    
}

export default Navbar;