import React, { Component } from 'react';
import { withRouter } from "react-router";
import styles from './Cart.module.scss';
import CartItem from '../../components/CartItem';
import { NavLink } from 'react-router-dom';


class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tax: 21,
            currentAttibuteColor: null,
            currentAttibuteSize: null,
        };
    }

    getUrl = () => {
        return (
            this.props.match.params.id.toUpperCase()
        )
    }

    deleteCartItem = () => {

    }

    componentDidMount = () => {
        this.setState(
            {
                items: (localStorage.getItem('items')?.length === 0) ? null : JSON.parse(localStorage.getItem('items')),
            }
        );
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (this.state?.items?.length !== prevState.items?.length) {
            this.setState(
                {
                    items: this.state.items,
                }
            );
        }
        this.matchСheck()
    }

    matchСheck = () => {
        let a = 1;
        if (this.state?.items?.length) {
            for (let i = 0; i < this.state.items.length; i++) {
                if (JSON.stringify(this.state.items[i]) === JSON.stringify(this.state.items[i + 1])) {
                    ++a
                }
            }
        }
        console.log(a)
    }

    order = () => {
        localStorage.clear();
    }


    render = () => {
        return (
            <div className={styles.cart}>
                <h2 className={styles.category}>{this.getUrl()}</h2>
                {
                    this.state?.items === null
                        ?
                        <div className={styles.emptyCart}>
                            <img className={styles.emptyImg} src='/img/emptyСart.jpg' alt='emptyCart' />
                            <NavLink to="/all">
                                <div className={styles.emptyText}>
                                    Cart is empty, please add items to cart
                                </div>
                            </NavLink>
                        </div>
                        :
                        <>
                            {
                                this.state?.items?.map((i, index) =>
                                    <CartItem
                                        key={i.id + index}
                                        product={i}
                                    />
                                )
                            }
                            <div className={styles.orderInfo}>
                                <div className={styles.orderContainer}>
                                    <div className={styles.orderTitles}>
                                        <p> Tax 21%:</p>
                                        <p>Quantity:</p>
                                        <p>Total:</p>
                                    </div>
                                    <div className={styles.orderValues}>
                                        <p> $42.00</p>
                                        <p> 3</p>
                                        <p>$200.00</p>
                                    </div>
                                </div>
                                <button onClick={() => this.order()} className={styles.orderBtn}>
                                    ORDER
                                </button>
                            </div>
                        </>
                }
            </div>
        );
    }
}

export default withRouter(Cart);
