import { gql } from '@apollo/client';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from "react-router";
import Cart from '../Cart';
import CurrencySwitcher from '../CurrencySwitcher';
import styles from './Header.module.scss';


class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {};
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

    componentDidMount = () => {
        this.getCategories();
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
                    <CurrencySwitcher />
                    <NavLink to='/all/cart'>
                        <Cart />
                    </NavLink>
                </section>
            </header>
        );
    }
}

export default withRouter(Header);
