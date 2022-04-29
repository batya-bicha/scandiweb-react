import React from 'react';
import styles from './Cart.module.scss';

const Cart = () => {
    return (
        <div className={styles.cart}>
            <img className={styles.cartImg} src='./img/cart.svg' alt='cart' />
        </div>
    );
};

export default Cart;