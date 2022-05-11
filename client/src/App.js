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
      currency: 'USD',
    }
  }

  addToCart = (id, brand, name, prices, attributes, gallery, quantity) => {
    this.setState(
      {
        id: id,
        brand: brand,
        name: name,
        prices: prices,
        attributes: attributes,
        gallery: gallery,
        quantity: quantity,
      }
    )
  }

  // componentDidUpdate = (prevProps, prevState) => {
  //   if (this.state.id !== prevState.id) {
  //     this.setState(
  //       {
  //         id: this.state.id,
  //         brand: this.state.brand,
  //         name: this.state.name,
  //         prices: this.state.prices,
  //         attributes: this.state.attributes,
  //         gallery: this.state.gallery,
  //         quantity: this.state.iquantity,
  //       }
  //     )
  //   }
  // }

  render = () => {
    return (
      <div className="App">
        <Header
          client={this.state.client}
        />
        <Switch>
          <Redirect from='/' to='/all' exact />
          <Route path='/:id' exact>
            <Main
              client={this.state.client}
              addToCart={this.addToCart}
            />
          </Route>
          <Route path='/:id/:id' exact>
            <Cart
              client={this.state.client}
              id={this.state.id}
            />
          </Route>
          <Route path='/:id/product/:id' exact>
            <Product
              client={this.state.client}
            />
          </Route>
        </Switch>
      </div>
    );
  }


}

export default App;
