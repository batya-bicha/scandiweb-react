import { gql } from '@apollo/client';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from "react-router";
import styles from './Header.module.scss';


class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currency: 'USD'
        };
    }

    getCategories = async () => {
        const categories = await this.props.client.query({
            query: gql`
                query {
                    categories{
                    name
                }
            }
            `
        })

        this.setState(
            {
                categories: categories.data,
            }
        )
    }

    getCurrencies = async () => {
        const currencies = await this.props.client.query({
            query: gql`
               query {
                currencies {
                    symbol
                    label
                  }
                }
            `
        });

        this.setState(
            {
                currencies: currencies.data.currencies
            }
        );
    }

    componentDidMount = () => {
        this.getCategories();
        this.getCurrencies();
    }


    renderCategoriesLinks = () => {
        return (
            <ul>
                {this.state.categories?.categories.map(i =>
                    <li key={i.name} className={styles.navItem}>
                        <NavLink
                            activeClassName={styles.active}
                            to={`/${i.name}`}
                        >
                            {i.name.toUpperCase()}
                        </NavLink>
                    </li>
                )}
            </ul>
        );
    }

    onClickSwitcher = (bool) => {
        this.props.onClickSwitcher(!bool)
    }

    onClickCart = (bool) => {
        this.props.onClickCart(!bool)
    }

    changeCurrencySymbol = () => {
        switch (localStorage.getItem('currency')) {
            case "USD":
                return '$';
            case "GBP":
                return '£';
            case "AUD":
                return 'A$';
            case "JPY":
                return '¥';
            case "RUB":
                return '₽';
            default:
                return '$'
        }
    }

    render = () => {
        return (
            <header className={styles.header}>
                <nav className={styles.navigation}>
                    {this.renderCategoriesLinks()}
                </nav>
                <div className={styles.logo}>
                    <img src='/img/logo.svg' alt='logo' />
                </div>
                <section className={styles.actions}>
                    <div
                        onClick={() => this.onClickSwitcher(this.props.switcherOpened, false)}
                        className={styles.switcher}
                    >
                        <span className={styles.switcherCurrency}>
                            {this.changeCurrencySymbol()}
                        </span>
                        {
                            this.props.switcherOpened
                                ?
                                <img style={{ transform: `rotate(0deg)` }} className={styles.switcherArrow} src='/img/arrowDown.svg' alt='arrow' />
                                :
                                <img style={{ transform: `rotate(180deg)` }} className={styles.switcherArrow} src='/img/arrowDown.svg' alt='arrow' />
                        }
                    </div>
                    <div onClick={() => this.onClickCart(this.props.cartOpened, false)} className={styles.drawer}>
                        <img className={styles.cartImg} src='/img/cart.svg' alt='cart' />
                    </div>
                </section>
            </header>
        );
    }
}

export default withRouter(Header);
