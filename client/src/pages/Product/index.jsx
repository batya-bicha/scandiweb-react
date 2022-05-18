import React, { Component } from 'react';
import { gql } from "@apollo/client";
import { withRouter } from "react-router";
import styles from './Product.module.scss';
import parse from 'html-react-parser';
import Drawer from '../../components/Drawer';

class Product extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentAttibuteColor: null,
            currentAttibuteSize: null,
            currentAttibuteUSB: null,
            currentAttibuteTouchID: null,
            currentAttributes: {
                color: null,
                size: null,
                usb: null,
                touchID: null,
            }
        }
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

    addItemsToStorage = (item) => {
        const items = JSON.parse(localStorage.getItem('items'));
        if (items?.length) {
            items.push(item)
            localStorage.setItem("items", JSON.stringify(Array.from(new Set(items))));
        } else {
            localStorage.setItem("items", JSON.stringify([item]));
        }
    }

    componentDidMount = () => {
        this.getProductById()
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (this.state.product?.gallery[0] !== prevState.product?.gallery[0]) {
            this.showBigImg(this.state.product?.gallery[0])
        }
        if (this.state.currentAttibuteColor !== prevState.currentAttibuteColor || this.state.currentAttibuteSize !== prevState.currentAttibuteSize || this.state.currentAttibuteUSB !== prevState.currentAttibuteUSB || this.state.currentAttibuteTouchID !== prevState.currentAttibuteTouchID) {
            this.setState(
                {
                    currentAttributes: {
                        color: this.state.currentAttibuteColor,
                        size: this.state.currentAttibuteSize,
                        usb: this.state.currentAttibuteUSB,
                        touchID: this.state.currentAttibuteTouchID,
                    }
                }
            )
        }
    }

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
                    {
                        this.state.product?.attributes.map((i, index) =>
                            i.name.toLowerCase() === 'color'
                                ?
                                <div key={index} className={styles.attributeColor}>
                                    <span className={styles.attributeName}>{i.name.toUpperCase()}:</span>
                                    {this.createProductAttributesColor(index)}
                                </div>
                                :
                                i.name.toLowerCase() === 'size' || i.name.toLowerCase() === 'capacity'
                                    ?
                                    <div key={index} className={styles.attributeSize}>
                                        <span className={styles.attributeName}>{i.name.toUpperCase()}:</span>
                                        {this.createProductAttributesSize(index)}
                                    </div>
                                    :
                                    i.name.toLowerCase() === 'with usb 3 ports'
                                        ?
                                        <div key={index} className={styles.attributeUSB}>
                                            <span className={styles.attributeName}>{i.name.toUpperCase()}:</span>
                                            {this.createProductAttributesUSB(index)}
                                        </div>
                                        :
                                        i.name.toLowerCase() === 'touch id in keyboard'
                                            ?
                                            <div key={index} className={styles.attributeSizeTouchID}>
                                                <span className={styles.attributeName}>{i.name.toUpperCase()}:</span>
                                                {this.createProductAttributesTouchID(index)}
                                            </div>
                                            :
                                            null
                        )
                    }
                </div>
                :
                null
        )
    }

    createProductAttributesColor = (index) => {
        return (
            <ul className={styles.attributeList}>
                {
                    this.state.product?.attributes[index].items.map((i, index) =>
                        <li
                            key={i.value}
                            className={styles.attributeItem}
                        >
                            <button
                                onClick={() => this.setSelectedAttributeColor(i)}
                                value={i.value}
                                style={{ backgroundColor: i.value }}
                                className={this.state.currentAttibuteColor === i.value
                                    ?
                                    styles.active
                                    :
                                    ''
                                }
                            >
                                {i.value.includes('#') ? null : i.value}
                            </button>
                        </li>
                    )
                }
            </ul>
        )
    }

    createProductAttributesSize = (index) => {
        return (
            <ul className={styles.attributeList}>
                {
                    this.state.product?.attributes[index].items.map((i, index) =>
                        <li
                            key={i.value}
                            className={styles.attributeItem}
                        >
                            <button
                                onClick={() => this.setSelectedAttributeSize(i)}
                                value={i.value}
                                style={{ backgroundColor: i.value }}
                                className={this.state.currentAttibuteSize === i.value
                                    ?
                                    styles.active
                                    :
                                    ''
                                }
                            >
                                {i.value.includes('#') ? null : i.value}
                            </button>
                        </li>
                    )
                }
            </ul>
        )
    }

    createProductAttributesUSB = (index) => {
        return (
            <ul className={styles.attributeList}>
                {
                    this.state.product?.attributes[index].items.map((i, index) =>
                        <li
                            key={i.value}
                            className={styles.attributeItem}
                        >
                            <button
                                onClick={() => this.setSelectedAttributeUSD(i)}
                                value={i.value}
                                style={{ backgroundColor: i.value }}
                                className={this.state.currentAttibuteUSB === i.value
                                    ?
                                    styles.active
                                    :
                                    ''
                                }
                            >
                                {i.value.includes('#') ? null : i.value}
                            </button>
                        </li>
                    )
                }
            </ul>
        )
    }

    createProductAttributesTouchID = (index) => {
        return (
            <ul className={styles.attributeList}>
                {
                    this.state.product?.attributes[index].items.map((i, index) =>
                        <li
                            key={i.value}
                            className={styles.attributeItem}
                        >
                            <button
                                onClick={() => this.setSelectedAttributeTouchID(i)}
                                value={i.value}
                                style={{ backgroundColor: i.value }}
                                className={this.state.currentAttibuteTouchID === i.value
                                    ?
                                    styles.active
                                    :
                                    ''
                                }
                            >
                                {i.value.includes('#') ? null : i.value}
                            </button>
                        </li>
                    )
                }
            </ul>
        )
    }

    //? ВАЛЮТА
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

    setSelectedAttributeColor = (attr) => {
        this.setState(
            {
                currentAttibuteColor: attr.value,
            }
        )
    }

    setSelectedAttributeSize = (attr) => {
        this.setState(
            {
                currentAttibuteSize: attr.value,
            }
        )
    }

    setSelectedAttributeUSD = (attr) => {
        this.setState(
            {
                currentAttibuteUSB: attr.value,
            }
        )
    }

    setSelectedAttributeTouchID = (attr) => {
        this.setState(
            {
                currentAttibuteTouchID: attr.value,
            }
        )
    }

    addToCart = (product) => {
        this.setState(
            {
                currentAttributes: {
                    color: this.state.currentAttibuteColor,
                    size: this.state.currentAttibuteSize,
                    usb: this.state.currentAttibuteUSB,
                    touchID: this.state.currentAttibuteTouchID,
                }
            }
        )
        // this.addItemsToStorage(product)
        console.log(product)
    }

    disableBtn = (product) => {
        return (
            !product?.inStock
                ?
                <button
                    disabled={true}
                    className={styles.productBtnDisabled}
                >
                    OUT OF STOCK
                </button>
                :
                product?.attributes.length === 1
                    ?
                    this.state.currentAttributes[product.attributes[0].name.toLowerCase()] === null
                        ?
                        <button
                            disabled={true}
                            className={styles.productBtnDisabled}
                        >
                            SELECT ATTRIBUTES
                        </button>
                        :
                        <button
                            className={styles.productBtn}
                            onClick={() => this.addToCart(this.state.product)}
                        >
                            ADD TO CART
                        </button>
                    :
                    product?.attributes.length === 2 && ((this.state.currentAttributes.color === null || this.state.currentAttributes.size === null))
                        ?
                        <button
                            disabled={true}
                            className={styles.productBtnDisabled}
                        >
                            SELECT ATTRIBUTES
                        </button>
                        :
                        product?.attributes.length === 3 && ((this.state.currentAttributes.size === null || this.state.currentAttributes.usb === null || this.state.currentAttributes.touchID === null))
                            ?
                            <button
                                disabled={true}
                                className={styles.productBtnDisabled}
                            >
                                SELECT ATTRIBUTES
                            </button>
                            :
                            <button
                                className={styles.productBtn}
                                onClick={() => this.addToCart(this.state.product)}
                            >
                                ADD TO CART
                            </button>
        )
    }



    render = () => {
        return (
            <div className={styles.product}>
                {this.props.cartOpened &&
                    <Drawer
                        onClose={this.props.onClickCart}
                    />
                }
                {this.renderProductGallery()}
                <section className={styles.productInfoBlock}>
                    {this.renderProductTitle()}
                    {this.renderProductAttributes()}
                    {this.renderProductCurrency()}
                    {this.disableBtn(this.state.product)}
                    <div className={styles.productDesc}>
                        {this.renderSomeDescription()}
                    </div>
                </section>
            </div>
        );
    }
}

export default withRouter(Product);
