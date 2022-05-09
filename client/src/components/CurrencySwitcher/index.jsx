import React, { Component } from 'react';
import styles from './CurrencySwitcher.module.scss';

class CurrencySwitcher extends Component {
    render = () => {
        return (
            <div className={styles.switcher}>
                <span className={styles.switcherCurrency}>$</span>
                <img className={styles.switcherArrow} src='/img/arrowDown.svg' alt='arrow' />
            </div>
        );
    }
}

export default CurrencySwitcher;