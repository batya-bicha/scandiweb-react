import React, { Component } from 'react';
import styles from './Card.module.scss';

class Card extends Component {
    constructor(props) {
        super(props)

        this.state = {
            handler: false,
            quantity: 1,
            __typename: 'Product'
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
            this.state.__typename,
            this.props.id,
            this.props.name,
            this.props.inStock,
            this.props.gallery,
            this.props.description,
            this.props.category,
            this.props.attributes,
            this.props.prices,
            this.props.brand,
            // this.state.quantity,
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
                        {this.state.currency}
                        {/* {this.props.prices[0].currency.symbol + this.props.prices[0]?.amount} */}
                    </span>
                </div>
            </div>
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
                currency: localStorage.getItem('currency')
            }
        )
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (this.state.currency !== prevState.currency) {
            this.setState(
                {
                    currency: localStorage.getItem('currency')
                }
            )
        }
        // console.log(this.state.currency, prevState.currency)
    }


    render = () => {
        return (
            this.isFakeCard()
        );
    }
}

export default Card;