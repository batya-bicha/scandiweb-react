import React, { Component } from 'react';
import styles from './Cart.module.scss';

class Cart extends Component {
    render = () => {
        return (
            <div className={styles.cart}>
                <img className={styles.cartImg} src='/img/cart.svg' alt='cart' />
            </div>
        );
    }
}

export default Cart;