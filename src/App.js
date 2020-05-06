import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/home.js';
import Products from './pages/products.js';
import Cart from './pages/cart.js';
import Checkout from './pages/checkout.js';
import Login from './pages/login.js';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class App extends React.Component {

  render(){
        return (
          <Router>
            <div>
              <Switch>
                <Route path="/veg">
                  <Products type="veg" />
                </Route>
                <Route path="/nonveg">
                  <Products type="nonveg" />
                </Route>
                <Route path="/drinks">
                  <Products type="drinks"/>
                </Route>
                <Route path="/cart">
                  <Cart />
                </Route>
                <Route path="/checkout">
                  <Checkout />
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/allitems">
                  <Products type="all"/>
                </Route>
                <Route path="/login">
                  <Products/>
                </Route>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </div>
          </Router>
        );
      }
}
export default App;
