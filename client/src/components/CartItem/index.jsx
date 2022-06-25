import React, { Component } from 'react';
import styles from './CartItem.module.scss';
import Slider from '../../components/Slider';


class CartItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            quantity: 1,
            product: null,
        };
    }


    componentDidMount = () => {
        this.props?.countingQuantity(this.state.quantity, this.props?.product?.id, this.props?.product?.currentAttributes)
        console.log(this.props?.product?.currentAttributes)
    }


    componentDidUpdate = (prevProps, prevState) => {
        // console.log(prevProps.total, this.props.total)
        // console.log(this.props?.total[0]?.quantity)
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
                                    {this.createProductAttributes(index, 'color')}
                                </div>
                                :
                                i.name.toLowerCase() === 'size' || i.name.toLowerCase() === 'capacity'
                                    ?
                                    <div key={index} className={styles.attributeSize}>
                                        <span className={styles.attributeName}>{i.name.toUpperCase()}:</span>
                                        {this.createProductAttributes(index, 'size')}
                                    </div>
                                    :
                                    i.name.toLowerCase() === 'with usb 3 ports'
                                        ?
                                        <div key={index} className={styles.attributeUSB}>
                                            <span className={styles.attributeName}>{i.name.toUpperCase()}:</span>
                                            {this.createProductAttributes(index, 'usb')}
                                        </div>
                                        :
                                        i.name.toLowerCase() === 'touch id in keyboard'
                                            ?
                                            <div key={index} className={styles.attributeSizeTouchID}>
                                                <span className={styles.attributeName}>{i.name.toUpperCase()}:</span>
                                                {this.createProductAttributes(index, 'touchID')}
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


    createProductAttributes = (index, name) => {
        return (
            <ul className={styles.attributeList}>
                {this.props.product?.attributes[index].items.map((i, index) =>
                    <li
                        key={i.value}
                        style={{ backgroundColor: i.value }}
                        className={styles.attributeItem + ' ' + (this.props.product.currentAttributes?.[name] === i.value
                            ?
                            styles.active
                            :
                            '' || (this.props.product.currentAttributes?.[name] === undefined || this.props.product.currentAttributes?.[name] === null
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


    onClickPlus = () => {
        this.setState(
            {
                quantity: this.state.quantity + 1,
            }
        )
        this.props.countingQuantity(this.state.quantity + 1, this.props?.product?.id, this.props?.product?.currentAttributes)
    }


    onClickMinus = () => {
        this.setState(
            {
                quantity: this.state.quantity - 1 || 1,
            }
        )
        this.props.countingQuantity(this.state.quantity - 1, this.props?.product?.id, this.props?.product?.currentAttributes)
    }


    comparisonDrawerQuantity = () => {
        return (
            this.props?.total?.map(i =>
                i.id === this.props?.product?.id && JSON.stringify(i.attr) === JSON.stringify(this.props?.product?.currentAttributes)
                    ?
                    i.quantity
                    :
                    null
            )
        )
    }


    renderProductQuantity = () => {
        return (
            <div className={styles.productQuantity}>
                <div onClick={() => this.onClickPlus()} className={styles.quantityPlus}></div>
                <div className={styles.quantity}>{this.comparisonDrawerQuantity().length ? this.comparisonDrawerQuantity() : this.state.quantity}</div>
                <div onClick={() => this.onClickMinus()} className={styles.quantityMinus}></div>
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
