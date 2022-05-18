import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import styles from './Drawer.module.scss';
import DrawerItem from '../DrawerItem';

class Drawer extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    closeDrawer = (e) => {
        return e.target.className.includes('overlay') ? this.props.onDrawer() : null;
    }

    componentDidMount = () => {
        this.setState(
            {
                items: (localStorage.getItem('items')?.length === 0) ? null : JSON.parse(localStorage.getItem('items')),
            }
        );
    }

    componentDidUpdate = (prevProps, prevState) => {
        // console.log(this.state, prevState)

    }

    checkOut = () => {
        localStorage.clear();
    }


    render = () => {
        return (
            <div onClick={(e) => this.closeDrawer(e)} className={styles.overlay}>
                <div className={styles.drawer}>

                    {
                        this.state?.items === null
                            ?
                            <div className={styles.emptyCart}>
                                <img className={styles.emptyImg} src='/img/emptyСart.jpg' alt='emptyCart' />
                                <div className={styles.emptyText}>
                                    Cart is empty, please add items to cart
                                </div>
                            </div>
                            :
                            <>
                                <h3 className={styles.drawerTitle}>
                                    <span className={styles.boldTitle}>My Bag</span>, 3 items
                                </h3>
                                <div className={styles.drawerItems}>
                                    {
                                        this.state?.items?.map((i, index) =>
                                            <DrawerItem
                                                key={i.id + index}
                                                product={i}
                                            />
                                        )
                                    }
                                </div>
                                <div className={styles.drawerTotal}>
                                    <span className={styles.total}>Total</span>
                                    <span className={styles.amount}>$200.00</span>
                                </div>
                                <div className={styles.drawerBtns}>
                                    <NavLink to='/all/cart'>
                                        <button className={styles.btnViewBag}>VIEW BAG</button>
                                    </NavLink>
                                    <button onClick={() => this.checkOut()} className={styles.btnCheckOut}>CHECK OUT</button>
                                </div>
                            </>
                    }
                </div>
            </div>
        );
    }
}

export default withRouter(Drawer);