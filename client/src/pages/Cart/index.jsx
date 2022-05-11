import React, { Component } from 'react';
import { gql } from "@apollo/client";
import { withRouter } from "react-router";
import styles from './Cart.module.scss';
import Slider from '../../components/Slider';

class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    getProductById = async () => {
        let id = this.props.match.params.id;
        let product;
        product = await this.props.client.query({
            query: gql`
                query {
                  product(id: "${id}"){
                    id
                    name
                    inStock
                    gallery
                    attributes {
                        name
                        items {
                            displayValue
                            value
                        }
                    }
                    prices {
                        currency {
                            label
                            symbol
                        }
                        amount
                    }
                    brand
                  }
                }
            `
        });

        this.setState(
            {
                product: product.data.product,
            }
        )
    }

    getUrl = () => {
        return (
            this.props.match.params.id.toUpperCase()
        )
    }

    componentDidMount = () => {
        this.getProductById();
    }

    render = () => {
        return (
            <div className={styles.cart}>
                {console.log(this.state.product, this.props.id)}
                <h2 className={styles.category}>{this.getUrl()}</h2>
                <section className={styles.cartContainer}>
                    <div className={styles.cartItem}>
                        <div className={styles.productInfoBlock}>
                            <div className={styles.productTitle}>
                                <h2 className={styles.productBrand}>Apollo</h2>
                                <h3 className={styles.productName}>Running Short</h3>
                            </div>
                            <div className={styles.productPrice}>
                                <span className={styles.productAmount}>$50.00</span>
                            </div>
                            <div className={styles.productAttributes}>
                                <div className={styles.attributeSize}>
                                    <span className={styles.attributeName}>SIZE:</span>
                                    <ul className={styles.attributeList}>
                                        <li className={styles.attributeItem}>XS</li>
                                        <li className={styles.attributeItem}>S</li>
                                        <li className={styles.attributeItem}>M</li>
                                        <li className={styles.attributeItem}>L</li>
                                    </ul>
                                </div>
                                <div className={styles.attributeColor}>
                                    <span className={styles.attributeName}>COLOR:</span>
                                    <ul className={styles.attributeList}>
                                        <li className={styles.attributeItem}></li>
                                        <li className={styles.attributeItem}></li>
                                        <li className={styles.attributeItem}></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className={styles.productView}>
                            <div className={styles.productQuantity}>
                                <div className={styles.quantityPlus}></div>
                                <div className={styles.quantity}>1</div>
                                <div className={styles.quantityMinus}></div>
                            </div>
                            <Slider>
                                <img src='/img/product.png' alt='{aaaa}' />
                                <img src='/img/product.png' alt='{aaaa}' />
                                <img src='/img/product.png' alt='{aaaa}' />
                                <img src='/img/product.png' alt='{aaaa}' />
                            </Slider>
                        </div>
                    </div>
                </section>
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
                    <button className={styles.orderBtn}>ORDER</button>
                </div>
            </div>
        );
    }
}

export default withRouter(Cart);
