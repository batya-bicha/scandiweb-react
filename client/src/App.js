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
        cache: new InMemoryCache()
      })
    }
  }

  openPDP = (id, gallery, brand, name, attributes, prices, description) => {
    this.setState(
      {
        id: id,
        gallery: gallery,
        brand: brand,
        name: name,
        attributes: attributes,
        prices: prices,
        description: description
      }
    )
  }


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
              openPDP={this.openPDP}
            />
          </Route>
          <Route path='/cart' exact>
            <Cart />
          </Route>
          <Route path='/:id/product/:id' exact>
            <Product
              client={this.state.client}
              id={this.state.id}
              gallery={this.state.gallery}
              brand={this.state.brand}
              name={this.state.name}
              attributes={this.state.attributes}
              prices={this.state.prices}
              description={this.state.description}
            />
          </Route>
        </Switch>
      </div>
    );
  }


}

export default App;
