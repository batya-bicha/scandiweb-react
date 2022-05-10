import React, { Component } from 'react';
import styles from './Card.module.scss';

class Card extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    checkInStock = () => {
        return (
            this.props.inStock
                ?
                <div className={styles.inStockText}>
                    OUT OF STOCK
                </div>
                :
                null
        )
    }

    //? ПРИ НАВЕДЕНИИ МБ ЧЕРЕЗ STATE.BOOL
    addToCart = () => {
        return (
            <div className={styles.toCart}>
                <img src='/img/whiteCart.svg' alt='whiteCart' />
            </div>
        )
    }

    addCard = () => {
        this.props.onCard(this.props.id, this.props.gallery, this.props.brand, this.props.name, this.props.attributes, this.props.prices, this.props.description);
    }

    renderCards = () => {
        return (
            <div onMouseOver={() => this.addToCart()} onClick={() => this.addCard()} className={styles.card + ' ' + (this.props.inStock ? styles.inStock : '')}>
                <div className={styles.cardImgContainer}>
                    <img className={styles.cardImage} src={this.props.gallery[0]} alt={this.props.name} />
                </div>
                {this.checkInStock()}
                <div className={styles.cardDesc}>
                    <span className={styles.cardName}>{this.props.name}</span>
                    <span className={styles.cardCost}>{this.props.prices[0].currency.symbol + this.props.prices[0]?.amount}</span>
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

    render = () => {
        return (
            this.isFakeCard()
        );
    }
}

export default Card;