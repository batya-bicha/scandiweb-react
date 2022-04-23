import React from 'react';
import Cart from '../Cart';
import CurrencySwitcher from '../CurrencySwitcher';
import styles from './Header.module.scss';

const Header = () => {
    return (
        <header className={styles.header}>
            <nav className={styles.navigation}>
                <ul>
                    <li className={styles.navItem}>WOMEN</li>
                    <li className={styles.navItem}>MEN</li>
                    <li className={styles.navItem}>KIDS</li>
                </ul>
            </nav>
            <div className={styles.logo}>
                <img src='/img/logo.svg' alt='logo' />
            </div>
            <section className={styles.actions}>
                <CurrencySwitcher />
                <Cart />
            </section>
        </header>
    );
};

export default Header;
