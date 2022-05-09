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

    addCard = () => {
        this.props.onCard(this.props.id, this.props.gallery, this.props.brand, this.props.name, this.props.attributes, this.props.prices, this.props.description);
    }

    render = () => {
        return (
            <div onClick={() => this.addCard()} className={styles.card + ' ' + (this.props.inStock ? styles.inStock : '')}>
                <div className={styles.cardImgContainer}>
                    <img className={styles.cardImage} src={this.props.gallery[0]} alt={this.props.name} />
                </div>
                {this.checkInStock()}
                <div className={styles.cardDesc}>
                    <span className={styles.cardName}>{this.props.name}</span>
                    <span className={styles.cardCost}>{this.props.prices[0].currency.symbol + this.props.prices[0].amount}</span>
                </div>
            </div>
        );
    }
}

export default Card;