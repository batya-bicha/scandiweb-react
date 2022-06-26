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
      product: {
        quantity: 0,
      },
      cartOpened: false,
      switcherOpened: false,
      currency: 'USD',
    }
  }


  componentDidMount = () => {
    localStorage.setItem('currency', this.state.currency)
  }


  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.product.id !== prevState.product.id) {
      this.addItemsToStorage(this.state.product)
    }

    if (this.state.currency !== prevState.currency) {
      this.setState(
        {
          currency: localStorage.getItem('currency')
        }
      )
    }

    if (this.state.product.quantity !== prevState.product.quantity) {
      this.addItemsToStorage(this.state.product)
    }
  }


  addToCart = (id, name, gallery, description, attributes, prices, brand, currentAttributes, quantity) => {
    this.setState(
      {
        product: {
          id: id,
          name: name,
          gallery: gallery,
          description: description,
          attributes: attributes,
          prices: prices,
          brand: brand,
          currentAttributes: currentAttributes,
          quantity: quantity,
        }
      }
    )
  }


  addItemsToStorage = (item) => {
    const items = JSON.parse(localStorage.getItem('items'));

    if (items?.length) {
      let flag = false;

      for (let i = 0; i < items.length; i++) {
        if (item.id === items[i].id) {
          flag = true;
          break;
        }
      }

      if (flag) {
        console.log('not unique');
      } else {
        items.push(item);
        localStorage.setItem("items", JSON.stringify(items));
      }

    } else {
      localStorage.setItem("items", JSON.stringify([item]));
    }
  }


  setCartOpened = (bool, switchBool) => {
    this.setState(
      {
        cartOpened: bool,
        switcherOpened: switchBool,
      }
    )
  }


  setSwitcherOpened = (bool, cartBool) => {
    this.setState(
      {
        switcherOpened: bool,
        cartOpened: cartBool,
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


  // countingQuantity = (...args) => {
  //   const totalQuantity = this.state?.drawerCounter;
  //   const quantity = args[0] === 0 ? 1 : args[0];
  //   const id = args[1];
  //   const attr = args[2];

  //   if (id === undefined) {
  //     return
  //   }

  //   if (totalQuantity?.length) {
  //     let flag = false;
  //     let index = 0;

  //     for (let i = 0; i < totalQuantity.length; i++) {
  //       if ((id === totalQuantity[i].id && JSON.stringify(attr) === JSON.stringify(totalQuantity[i].attr)) || (id === totalQuantity[i].id && JSON.stringify(attr) === null)) {
  //         index = i
  //         flag = true;
  //         break;
  //       }
  //     }

  //     if (flag) {
  //       totalQuantity[index].quantity = quantity;
  //     } else {
  //       totalQuantity?.push({ 'id': id, 'attr': attr, 'quantity': quantity });
  //     }

  //   } else {
  //     totalQuantity?.push({ 'id': id, 'attr': attr, 'quantity': quantity });
  //   }

  //   console.log(totalQuantity)

  //   return (
  //     this.setState(
  //       {
  //         drawerCounter: totalQuantity,
  //       }
  //     )
  //   )
  // }


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
              currency={this.state.currency}
            // countingQuantity={this.countingQuantity}
            />
          </Route>
          <Route path='/:id/:id' exact>
            <Cart
              cartOpened={this.state.cartOpened}
              onClickCart={this.setCartOpened}
              switcherOpened={this.state.switcherOpened}
              onClickSwitcher={this.setSwitcherOpened}
              setCurrency={this.setCurrency}
              currency={this.state.currency}
              client={this.state.client}
            // countingQuantity={this.countingQuantity}
            />
          </Route>
          <Route path='/:id/product/:id' exact>
            <Product
              cartOpened={this.state.cartOpened}
              switcherOpened={this.state.switcherOpened}
              onClickSwitcher={this.setSwitcherOpened}
              onClickCart={this.setCartOpened}
              setCurrency={this.setCurrency}
              currency={this.state.currency}
              client={this.state.client}
            // countingQuantity={this.countingQuantity}
            />
          </Route>
        </Switch>
      </div>
    );
  }


}

export default App;
