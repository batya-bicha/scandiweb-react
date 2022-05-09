import React, { Component } from 'react';
import { gql } from "@apollo/client";
import { NavLink } from 'react-router-dom';
import Card from '../Card';
import styles from './Main.module.scss';


class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    getProducts = async () => {
        let products;
        products = await this.props.client.query({
            query: gql`
                query {
                    category{
                        products{
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
                }
            `
        });

        this.setState(
            {
                products: products.data
            }
        );
    }

    componentDidMount = () => {
        console.log(this.props)
        this.getProducts();
    }

    render = () => {
        return (
            <main className={styles.main}>
                <h2 className={styles.category}>{'{Category name}'}</h2>
                <section className={styles.container}>
                    {this.state.products?.category.products.map(i =>
                        <NavLink key={i.id} exact to={`/product/${i.id}`} >
                            <Card
                                id={i.id}
                                name={i.name}
                                inStock={i.inStock}
                                gallery={i.gallery}
                                description={i.description}
                                attributes={i.attributes}
                                prices={i.prices}
                                brand={i.brand}
                                onCard={this.props.openPDP}
                            />
                        </NavLink>
                    )}
                </section>
            </main>
        );
    }
}

export default Main;
