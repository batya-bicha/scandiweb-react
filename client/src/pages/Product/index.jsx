import React, { Component } from 'react';
import { gql } from "@apollo/client";
import { withRouter } from "react-router";
import styles from './Product.module.scss';
import parse from 'html-react-parser';

class Product extends Component {
    constructor(props) {
        super(props)

        this.state = {}
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
                    description
                    category
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

    componentDidMount = () => {
        this.getProductById()
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (this.state.product?.gallery[0] !== prevState.product?.gallery[0]) {
            this.showBigImg(this.state.product?.gallery[0])
        }
    }

    //? renderProductCurrency!!!

    renderProductGallery = () => {
        return (
            <section className={styles.productSlider}>
                {this.state.product?.gallery.length > 1
                    ?
                    <div className={styles.leftSlider}>
                        {this.state.product?.gallery.map((i, index) =>
                            <div onClick={() => this.showBigImg(i)} key={i} className={styles.sliderImg}>
                                <img
                                    className={this.state.src === i ? styles.active : ''}
                                    src={i}
                                    alt={i}
                                />
                            </div>
                        )}
                    </div>
                    :
                    null
                }
                <div className={styles.productImg}>
                    <img
                        src={this.state.src === undefined ? this.state.product?.gallery[0] : this.state.src}
                        alt={this.state.product?.name}
                    />
                </div>
            </section>
        )
    }

    renderProductTitle = () => {
        return (
            <div className={styles.productTitle}>
                <h2 className={styles.productBrand}>{this.state.product?.brand}</h2>
                <h3 className={styles.productName}>{this.state.product?.name}</h3>
            </div>
        )
    }

    renderProductAttributes = () => {
        return (
            this.state.product?.attributes.length !== 0
                ?
                <div className={styles.productAttributes}>
                    {this.state.product?.attributes.map((i, index) =>
                        i.name.toLowerCase() === 'color'
                            ?
                            <div key={index} className={styles.attributeColor}>
                                <span className={styles.attributeName}>{i.name.toUpperCase()}:</span>
                                {this.createProductAttributes(index)}
                            </div>
                            :
                            i.name.toLowerCase() === 'size' || i.name.toLowerCase() === 'capacity'
                                ?
                                <div key={index} className={styles.attributeSize}>
                                    <span className={styles.attributeName}>{i.name.toUpperCase()}:</span>
                                    {this.createProductAttributes(index)}
                                </div>
                                :
                                null
                    )}
                </div>
                :
                null
        )
    }

    createProductAttributes = (index) => {
        return (
            <ul className={styles.attributeList}>
                {this.state.product?.attributes[index].items.map((i, index) =>
                    <li
                        key={i.value}
                        style={{ backgroundColor: i.value }}
                        className={styles.attributeItem + ' ' + (index === 0 ? styles.active : '')}>

                        {i.value.includes('#') ? null : i.value}
                    </li>
                )}
            </ul>
        )
    }

    renderProductCurrency = () => {
        return (
            <div className={styles.productPrice}>
                <span className={styles.priceName}>PRICE:</span>
                <span className={styles.productAmount}>{this.state.product?.prices[0].currency.symbol + '' + this.state.product?.prices[0].amount}</span>
            </div>
        )
    }

    renderSomeDescription = () => {
        return (
            this.state.product?.description ? parse(this.state.product?.description) : ''

        )
    }

    showBigImg = (src) => {
        this.setState(
            {
                src: src,
            }
        )
    }


    render = () => {
        return (
            <div className={styles.product}>
                {this.renderProductGallery()}
                <section className={styles.productInfoBlock}>
                    {this.renderProductTitle()}
                    {this.renderProductAttributes()}
                    {this.renderProductCurrency()}
                    <button className={styles.productBtn}>ADD TO CART</button>
                    <div className={styles.productDesc}>
                        {this.renderSomeDescription()}
                    </div>
                </section>
            </div>
        );
    }
}

export default withRouter(Product);