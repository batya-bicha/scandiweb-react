import React, { Component } from 'react';
import { gql } from "@apollo/client";
import { withRouter } from "react-router";
import styles from './Product.module.scss';
import parse from 'html-react-parser';
import Drawer from '../../components/Drawer';
import CurrencySwitcher from '../../components/CurrencySwitcher';

class Product extends Component {
    constructor(props) {
        super(props)

        this.state = {
            noAttributes: null,
            currentAttibuteColor: null,
            currentAttibuteSize: null,
            currentAttibuteUSB: null,
            currentAttibuteTouchID: null,
            currentProduct: {
                id: null,
                name: null,
                gallery: null,
                description: null,
                attributes: null,
                prices: null,
                brand: null,
                currentAttributes: {
                    color: null,
                    size: null,
                    usb: null,
                    touchID: null,
                },
            },
            quantity: 1,
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
                noAttributes: product.data.product.attributes.length === 0 ? true : null
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

        if (this.state.currentAttibuteColor !== prevState.currentAttibuteColor
            || this.state.currentAttibuteSize !== prevState.currentAttibuteSize
            || this.state.currentAttibuteUSB !== prevState.currentAttibuteUSB
            || this.state.currentAttibuteTouchID !== prevState.currentAttibuteTouchID
            || this.state.noAttributes !== prevState.noAttributes) {

            this.setState(
                {
                    currentProduct: {
                        id: this.state.product.id,
                        name: this.state.product.name,
                        gallery: this.state.product.gallery,
                        description: this.state.product.description,
                        attributes: this.state.product.attributes,
                        prices: this.state.product.prices,
                        brand: this.state.product.brand,
                        currentAttributes: {
                            color: this.state.currentAttibuteColor,
                            size: this.state.currentAttibuteSize,
                            usb: this.state.currentAttibuteUSB,
                            touchID: this.state.currentAttibuteTouchID,
                        },
                        quantity: this.state.quantity,
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
                                    {this.createProductAttributes(index, 'currentAttibuteColor', 'setSelectedAttributeColor')}
                                </div>
                                :
                                i.name.toLowerCase() === 'size' || i.name.toLowerCase() === 'capacity'
                                    ?
                                    <div key={index} className={styles.attributeSize}>
                                        <span className={styles.attributeName}>{i.name.toUpperCase()}:</span>
                                        {this.createProductAttributes(index, 'currentAttibuteSize', 'setSelectedAttributeSize')}
                                    </div>
                                    :
                                    i.name.toLowerCase() === 'with usb 3 ports'
                                        ?
                                        <div key={index} className={styles.attributeUSB}>
                                            <span className={styles.attributeName}>{i.name.toUpperCase()}:</span>
                                            {this.createProductAttributes(index, 'currentAttibuteUSB', 'setSelectedAttributeUSD')}
                                        </div>
                                        :
                                        i.name.toLowerCase() === 'touch id in keyboard'
                                            ?
                                            <div key={index} className={styles.attributeSizeTouchID}>
                                                <span className={styles.attributeName}>{i.name.toUpperCase()}:</span>
                                                {this.createProductAttributes(index, 'currentAttibuteTouchID', 'setSelectedAttributeTouchID')}
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

    createProductAttributes = (index, currenAttr, setAttr) => {
        return (
            <ul className={styles.attributeList}>
                {this.state.product?.attributes[index].items.map((i, index) =>
                    <li
                        key={i.value}
                        className={styles.attributeItem}
                    >
                        <button
                            onClick={() => this[setAttr](i)}
                            value={i.value}
                            style={{ backgroundColor: i.value }}
                            className={this.state[currenAttr] === i.value
                                ?
                                styles.active
                                :
                                ''
                            }
                        >
                            {i.value.includes('#') ? null : i.value}
                        </button>
                    </li>
                )}
            </ul>
        )
    }

    setProductCurrency = () => {
        return (
            this.state?.product?.prices.map(i =>
                i.currency.label === localStorage.getItem('currency')
                    ?
                    i.currency.symbol + '' + i.amount
                    :
                    null
            )
        )
    }

    renderProductCurrency = () => {
        return (
            <div className={styles.productPrice}>
                <span className={styles.priceName}>PRICE:</span>
                <span className={styles.productAmount}>{this.setProductCurrency()}</span>
            </div>
        )
    }

    renderDescription = () => {
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

    addItemsToStorage = (item) => {
        const items = JSON.parse(localStorage.getItem('items'));
        if (items?.length) {
            let flag = false;
            for (let i = 0; i < items.length; i++) {
                if (item.id === items[i].id && JSON.stringify(item.currentAttributes) === JSON.stringify(items[i].currentAttributes)) {
                    flag = true;
                    break;
                }
            }
            if (flag) {
                localStorage.setItem("items", JSON.stringify(items));
            } else {
                items.push(item);
                localStorage.setItem("items", JSON.stringify(items));
            }
        } else {
            localStorage.setItem("items", JSON.stringify([item]));
        }
    }

    checkNoAttributes = () => {
        return (
            this.state.noAttributes
                ?
                this.setState(
                    {
                        noAttributes: false
                    }
                )
                :
                null
        )
    }

    addToCart = (product) => {
        this.checkNoAttributes()
        this.setState(
            {
                currentProduct: {
                    id: product.id,
                    name: product.name,
                    gallery: product.gallery,
                    description: product.description,
                    attributes: product.attributes ? product.attributes : null,
                    prices: product.prices,
                    brand: product.brand,
                    currentAttributes: {
                        color: this.state.currentAttibuteColor,
                        size: this.state.currentAttibuteSize,
                        usb: this.state.currentAttibuteUSB,
                        touchID: this.state.currentAttibuteTouchID,
                    },
                    quantity: this.state.quantity,
                }

            }
        )
        this.addItemsToStorage(this.state.currentProduct)
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
                    this.state.currentProduct?.currentAttributes[product.attributes[0].name.toLowerCase()] === null
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
                    product?.attributes.length === 2 && ((this.state.currentProduct?.currentAttributes.color === null || this.state.currentProduct?.currentAttributes.size === null))
                        ?
                        <button
                            disabled={true}
                            className={styles.productBtnDisabled}
                        >
                            SELECT ATTRIBUTES
                        </button>
                        :
                        product?.attributes.length === 3 && ((this.state.currentProduct?.currentAttributes.size === null || this.state.currentProduct?.currentAttributes.usb === null || this.state.currentProduct?.currentAttributes.touchID === null))
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
                {
                    this.props.switcherOpened
                    &&
                    <CurrencySwitcher
                        client={this.props.client}
                        onSwitcher={this.props.onClickSwitcher}
                        setCurrency={this.props.setCurrency}
                    />
                }
                {
                    this.props.cartOpened
                    &&
                    <Drawer
                        onDrawer={this.props.onClickCart}
                    />
                }
                {this.renderProductGallery()}
                <section className={styles.productInfoBlock}>
                    {this.renderProductTitle()}
                    {this.state.quantity}
                    {this.renderProductAttributes()}
                    {this.renderProductCurrency()}
                    {this.disableBtn(this.state.product)}
                    <div className={styles.productDesc}>
                        {this.renderDescription()}
                    </div>
                </section>
            </div>
        );
    }
}

export default withRouter(Product);
