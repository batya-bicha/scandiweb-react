import React, { Component } from 'react';
import { gql } from "@apollo/client";
import styles from './CurrencySwitcher.module.scss';

class CurrencySwitcher extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };
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
                currencies: currencies.data.currencies,
            }
        );
    }


    openSwitcher = (bool) => {
        this.setState(
            {
                open: !bool
            }
        )
    }

    componentDidMount() {
        this.getCurrencies();
    }

    closeSwitcher = (e) => {
        return e.target.className.includes('currencyText') || e.target.className.includes('currency') || e.target.className.includes('overlay') ? this.props.onSwitcher() : null;
    }

    setCurrency = (currency) => {
        this.props.setCurrency(currency)
    }

    renderCurrencies = () => {
        return (
            this.state.currencies?.map(i =>
                i.label === localStorage.getItem('currency')
                    ?
                    <div onClick={() => this.setCurrency(i.label)} key={i.symbol} className={styles.currency + ' ' + styles.active}>
                        <span className={styles.currencyText}>{i.symbol + ' ' + i.label}</span>
                    </div>
                    :
                    <div onClick={() => this.setCurrency(i.label)} key={i.symbol} className={styles.currency}>
                        <span className={styles.currencyText}>{i.symbol + ' ' + i.label}</span>
                    </div>
            )
        )
    }


    render = () => {
        return (
            <div onClick={(e) => this.closeSwitcher(e)} className={styles.overlay}>
                <div className={styles.switcher}>
                    {this.renderCurrencies()}
                </div>
            </div>
        );
    }
}

export default CurrencySwitcher;