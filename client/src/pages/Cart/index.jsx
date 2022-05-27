import React, { Component } from 'react';
import { withRouter } from "react-router";
import styles from './Cart.module.scss';
import CartItem from '../../components/CartItem';
import { NavLink } from 'react-router-dom';
import CurrencySwitcher from '../../components/CurrencySwitcher';
import Drawer from '../../components/Drawer';


class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tax: 21,
            total: 0,
            quantity: 1,
            counter: [],
        };
    }


    componentDidMount = () => {
        this.setState(
            {
                items: (localStorage.getItem('items')?.length === 0) ? null : JSON.parse(localStorage.getItem('items')),
                counter: [],
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
    }


    getUrl = () => {
        return (
            this.props.match.params.id.toUpperCase()
        )
    }

    //? DELETE DELETE
    deleteCartItem = () => {

    }


    changeDrawerItemsQuantity = () => {

    }


    renderQuantity = () => {
        return (
            this.state?.counter?.reduce((accm, i) => { return accm + i.quantity }, 0)
        )
    }


    countingQuantity = (...args) => {
        const totalQuantity = this.state?.counter;
        const quantity = args[0] === 0 ? 1 : args[0];
        const id = args[1];
        const attr = args[2];

        if (id === undefined) {
            return
        }

        if (totalQuantity.length) {
            let flag = false;
            let index = 0;
            for (let i = 0; i < totalQuantity.length; i++) {
                if (id === totalQuantity[i].id) {
                    index = i
                    flag = true;
                    break;
                }
            }
            if (flag) {
                totalQuantity[index].quantity = quantity;
            } else {
                totalQuantity?.push({ 'id': id, 'attr': attr, 'quantity': quantity });
            }
        } else {
            totalQuantity?.push({ 'id': id, 'attr': attr, 'quantity': quantity });
        }

        return (
            this.setState(
                {
                    counter: totalQuantity
                }
            )
        )
    }


    renderTotalCost = () => {
        return (
            <div className={styles.orderContainer}>
                <div className={styles.orderTitles}>
                    <p> Tax {this.state.tax}%:</p>
                    <p>Quantity:</p>
                    <p>Total:</p>
                </div>
                <div className={styles.orderValues}>
                    <p>{this.totalSymbol()}{(this.cartTotal() * this.state.tax / 100).toFixed(2)}</p>
                    <p>{this.renderQuantity()}</p>
                    <p>{this.totalSymbol()}{this.cartTotal().toFixed(2)}</p>
                </div>
            </div>
        )
    }


    totalSymbol = () => {
        let symbol = '';
        this.state?.items?.map(item =>
            item?.prices?.map(price =>
                price?.currency?.label === localStorage.getItem('currency')
                    ?
                    symbol = price.currency.symbol
                    :
                    null
            )
        )

        return (
            symbol
        )
    }


    cartTotal = () => {
        let total = 0;
        this.state?.items?.map(item =>
            item.prices.map(price =>
                price.currency.label === localStorage.getItem('currency')
                    ?
                    total += price.amount
                    :
                    null
            )
        )

        return (
            total
        )
    }


    cartIsEmpty = () => {
        return (
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
                                countingQuantity={this.countingQuantity}
                            />
                        )
                    }
                    <div className={styles.orderInfo}>
                        {this.renderTotalCost()}
                        <button onClick={() => this.placeAnOrder()} className={styles.orderBtn}>
                            ORDER
                        </button>
                    </div>
                </>
        )
    }


    placeAnOrder = () => {
        localStorage.removeItem('items');
    }


    render = () => {
        return (
            <div className={styles.cart}>
                {
                    this.props.switcherOpened
                    &&
                    <CurrencySwitcher
                        client={this.props.client}
                        onSwitcher={this.props.onClickSwitcher}
                        setCurrency={this.props.setCurrency}
                    />
                }
                {
                    this.props.cartOpened
                    &&
                    <Drawer
                        onDrawer={this.props.onClickCart}
                        countingQuantity={this.countingQuantity}
                        items={this.state.counter}
                    />
                }
                <h2 className={styles.category}>{this.getUrl()}</h2>
                {this.cartIsEmpty()}
            </div>
        );
    }
}

export default withRouter(Cart);
