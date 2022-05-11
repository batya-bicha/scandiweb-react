import React, { Component } from 'react';
import styles from './Card.module.scss';

class Card extends Component {
    constructor(props) {
        super(props)

        this.state = {
            handler: false,
            quantity: 1
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


    //? ПОРАБОТАТЬ С СЫЛКАМИ И ПЕРЕДАВАТЬ В МЕТОД ДАННЫЕ ПРОДУКТА
    addToCart = (e) => {
        e.preventDefault();
        this.props.addToCart(
            this.props.id,
            this.props.brand,
            this.props.name,
            this.props.prices,
            this.props.attributes,
            this.props.gallery,
            this.state.quantity,
        )
    }

    renderCartBtn = () => {
        return (
            <div onClick={(e) => this.addToCart(e)} className={styles.toCart}>
                <img src='/img/whiteCart.svg' alt='whiteCart' />
            </div>)
    }

    renderCards = () => {
        return (
            <div className={styles.card + ' ' + (this.props.inStock ? '' : styles.inStock)}>
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