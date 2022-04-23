import React from 'react';
import styles from './Card.module.scss';

const Card = () => {
    return (
        <div className={styles.card}>
            <img className={styles.cardImage} src='./img/product.png' alt='{CHANGE}' />
            <div className={styles.cardDesc}>
                <span className={styles.cardName}>{'{Apollo Running Short}'}</span>
                <span className={styles.cardCost}>{'{$50.00}'}</span>
            </div>
        </div>
    );
};

export default Card;