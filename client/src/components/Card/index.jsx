import { React, useState } from 'react';
import styles from './Card.module.scss';

const Card = () => {
    const { items, setItems } = useState([]);

    return (
        <div className={styles.card}>
            <img className={styles.cardImage} src='./img/product.png' alt='{CHANGE}' />
            <div className={styles.cardDesc}>
                <span className={styles.cardName}>{'{Apollo Running Short}'}</span>
                <span className={styles.cardCost}>{'{$50.00}'}</span>
            </div>
            {items && items.map(item => (
                console.log(item)
            ))}
        </div>
    );
};

export default Card;