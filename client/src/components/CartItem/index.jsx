import React, { Component } from 'react';
import styles from './CartItem.module.scss';
import Slider from '../../components/Slider';


class CartItem extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    renderProductTitle = () => {
        return (
            <div className={styles.productTitle}>
                <h2 className={styles.productBrand}>{this.props?.product?.brand}</h2>
                <h3 className={styles.productName}>{this.props?.product?.name}</h3>
            </div>
        )
    }

    renderProductPrice = () => {
        return (
            <div className={styles.productPrice}>
                <span className={styles.productAmount}>
                    {this.setItemCurrency()}
                </span>
            </div>
        )
    }

    renderProductAttributes = () => {
        return (
            this.props.product?.attributes.length !== 0
                ?
                <div className={styles.productAttributes}>
                    {
                        this.props.product?.attributes.map((i, index) =>
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
                {this.props.product?.attributes[index].items.map((i, index) =>
                    <li
                        key={i.value}
                        style={{ backgroundColor: i.value }}
                        className={styles.attributeItem + ' ' + (this.props.product.currentAttributes?.color === i.value
                            ?
                            styles.active
                            :
                            '' || (this.props.product.currentAttributes?.color === undefined
                                ?
                                (index === 0 ? styles.active : '')
                                :
                                '')
                        )}
                    >
                        {i.value.includes('#') ? null : i.value}
                    </li>
                )}
            </ul>
        )
    }

    createProductAttributesSize = (index) => {
        return (
            <ul className={styles.attributeList}>
                {this.props.product?.attributes[index].items.map((i, index) =>
                    <li
                        key={i.value}
                        style={{ backgroundColor: i.value }}
                        className={styles.attributeItem + ' ' + (this.props.product.currentAttributes?.size === i.value
                            ?
                            styles.active
                            :
                            '' || (this.props.product.currentAttributes?.size === undefined
                                ?
                                (index === 0 ? styles.active : '')
                                :
                                '')
                        )}
                    >
                        {i.value.includes('#') ? null : i.value}
                    </li>
                )}
            </ul>
        )
    }

    createProductAttributesUSB = (index) => {
        return (
            <ul className={styles.attributeList}>
                {this.props.product?.attributes[index].items.map((i, index) =>
                    <li
                        key={i.value}
                        style={{ backgroundColor: i.value }}
                        className={styles.attributeItem + ' ' + (this.props.product.currentAttributes?.usb === i.value
                            ?
                            styles.active
                            :
                            '' || (this.props.product.currentAttributes?.usb === undefined
                                ?
                                (index === 0 ? styles.active : '')
                                :
                                '')
                        )}
                    >
                        {i.value.includes('#') ? null : i.value}
                    </li>
                )}
            </ul>
        )
    }

    createProductAttributesTouchID = (index) => {
        return (
            <ul className={styles.attributeList}>
                {this.props.product?.attributes[index].items.map((i, index) =>
                    <li
                        key={i.value}
                        style={{ backgroundColor: i.value }}
                        className={styles.attributeItem + ' ' + (this.props.product.currentAttributes?.touchID === i.value
                            ?
                            styles.active
                            :
                            '' || (this.props.product.currentAttributes?.touchID === undefined
                                ?
                                (index === 0 ? styles.active : '')
                                :
                                '')
                        )}
                    >
                        {i.value.includes('#') ? null : i.value}
                    </li>
                )}
            </ul>
        )
    }

    renderProductQuantity = () => {
        return (
            <div className={styles.productQuantity}>
                <div className={styles.quantityPlus}></div>
                <div className={styles.quantity}>1</div>
                <div className={styles.quantityMinus}></div>
            </div>
        )
    }

    renderProductSlider = () => {
        return (
            <Slider>
                {this.props?.product?.gallery.length > 1
                    ?
                    this.props?.product?.gallery.map((i, index) =>
                        <img
                            src={i}
                            alt='product'
                            key={i}
                        />
                    )
                    :
                    <img
                        src={this.props?.product?.gallery[0]}
                        alt='product'
                        key={this.props?.product?.gallery[0]}
                    />
                }
            </Slider>
        )
    }

    setItemCurrency = () => {
        return (
            this.props?.product?.prices.map(i =>
                i.currency.label === localStorage.getItem('currency')
                    ?
                    i.currency.symbol + '' + i.amount
                    :
                    null
            )
        )
    }


    render() {
        console.log(this.props.product)
        return (
            <section className={styles.cartContainer}>
                <div className={styles.cartItem}>
                    <div className={styles.productInfoBlock}>
                        {this.renderProductTitle()}
                        {this.renderProductPrice()}
                        {this.renderProductAttributes()}
                    </div>
                    <div className={styles.productView}>
                        {this.renderProductQuantity()}
                        {this.renderProductSlider()}
                    </div>
                </div>
            </section>
        )
    }
}

export default CartItem;
