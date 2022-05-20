import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styles from './Card.module.scss';

class Card extends Component {
    constructor(props) {
        super(props)

        this.state = {
            handler: false,
            quantity: 1,
            currency: 'USD'
        }
    }

    checkInStock = () => {
        return (
            this.props.inStock
                ?
                this.renderCartBtn()
                :
                <div className={styles.inStockText}>
                    OUT OF STOCK
                </div>
        )
    }

    addToCart = (e) => {
        e.preventDefault();
        this.props.addToCart(
            this.props.id,
            this.props.name,
            this.props.gallery,
            this.props.description,
            this.props.attributes,
            this.props.prices,
            this.props.brand,
        )
    }

    renderCartBtn = () => {
        return (
            <div onClick={(e) => this.addToCart(e)} className={styles.toCart}>
                <img src='/img/whiteCart.svg' alt='whiteCart' />
            </div>
        )
    }

    renderCards = () => {
        return (
            <div className={styles.card + ' ' + (this.props.inStock ? '' : styles.inStock)}>
                <div className={styles.cardImgContainer}>
                    <img className={styles.cardImage} src={this.props.gallery[0]} alt={this.props.name} />
                </div>
                {this.checkInStock()}
                <div className={styles.cardDesc}>
                    <span className={styles.cardName}>{this.props.name + ' ' + this.props.brand}</span>
                    <span className={styles.cardCost}>
                        {this.setCardCurrency()}
                        {/* {console.log(this.state.currency)} */}
                    </span>
                </div>
            </div>
        )
    }

    setCardCurrency = () => {
        return (
            this.props?.prices?.map(i =>
                i.currency.label === this.state.currency
                    ?
                    i.currency.symbol + '' + i.amount
                    :
                    null
            )
        )
    }

    isFakeCard = () => {
        return (
            this.props.fakeCard === 'fakeCard' && this.props.number === 1
                ?
                <div className={styles.fakeCard}></div>
                :
                this.props.fakeCard === 'fakeCard' && this.props.number === 2
                    ?
                    <>
                        <div className={styles.fakeCard}></div>
                        <div className={styles.fakeCard}></div>
                    </>
                    :
                    this.renderCards()
        )
    }

    componentDidMount = () => {
        this.setState(
            {
                currency: localStorage.getItem('currency'),
                url: this.props.match.params.id
            }
        )
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (this.props.currency !== prevProps.currency || this.state.currency !== localStorage.getItem('currency')) {
            this.setState(
                {
                    currency: localStorage.getItem('currency')
                }
            )
        }
    }



    render = () => {
        return (
            this.isFakeCard()
        );
    }
}

export default withRouter(Card);