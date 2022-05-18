import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";
import './App.scss';
import Main from './components/Main';
import Cart from './pages/Cart';
import Header from './components/Header';
import Product from './pages/Product';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      client: new ApolloClient({
        uri: 'http://localhost:4000/',
        cache: new InMemoryCache(),
      }),
      product: {},
      cartOpened: false,
      switcherOpened: false,
      currency: null
    }
  }

  addToCart = (__typename, id, name, inStock, gallery, description, category, attributes, prices, brand, quantity) => {
    this.setState(
      {
        product: {
          __typename: __typename,
          id: id,
          name: name,
          inStock: inStock,
          gallery: gallery,
          description: description,
          category: category,
          attributes: attributes,
          prices: prices,
          brand: brand,
          // quantity: quantity,
        }
      }
    )
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.product.id !== prevState.product.id) {
      this.addItemsToStorage(this.state.product)

    }

    if (this.state.currency !== prevState.currency) {
      // console.log(this.state.currency)
    }
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

  setCartOpened = (bool) => {
    this.setState(
      {
        cartOpened: bool,
      }
    )
  }

  setSwitcherOpened = (bool) => {
    this.setState(
      {
        switcherOpened: bool,
      }
    )
  }

  setCurrency = (currency = 'USD') => {
    localStorage.setItem('currency', currency)
    this.setState(
      {
        currency: localStorage.getItem('currency')
      }
    )
  }


  render = () => {
    return (
      <div className="App">
        <Header
          client={this.state.client}
          onClickCart={this.setCartOpened}
          onClickSwitcher={this.setSwitcherOpened}
          cartOpened={this.state.cartOpened}
          switcherOpened={this.state.switcherOpened}
        />
        <Switch>
          <Redirect from='/' to='/all' exact />
          <Route path='/:id' exact>
            <Main
              client={this.state.client}
              addToCart={this.addToCart}
              cartOpened={this.state.cartOpened}
              switcherOpened={this.state.switcherOpened}
              onClickSwitcher={this.setSwitcherOpened}
              onClickCart={this.setCartOpened}
              setCurrency={this.setCurrency}
            />
          </Route>
          <Route path='/:id/:id' exact>
            <Cart
            // client={this.state.client}
            // id={this.state.id}
            />
          </Route>
          <Route path='/:id/product/:id' exact>
            <Product
              cartOpened={this.state.cartOpened}
              onClickCart={this.setCartOpened}
              client={this.state.client}
            />
          </Route>
        </Switch>
      </div>
    );
  }


}

export default App;
