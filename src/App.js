import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './components/Reusable/Header/Header';
import Error from './components/Error/Error';
import Banner from './components/Home/Banner/Banner';
import ProductsSector from './components/Home/ProductsSector/ProductsSector';
import HomeMessage from './components/Home/HomeMessage/HomeMessage';
import SomeFeaturedProducts from './components/Home/SomeFeaturedProducts/SomeFeaturedProducts';
import ProductDetail from './components/ProductDetail/ProductDetail';
import GenderPage from './components/GenderPage/GenderPage';
import Cart from './components/Cart/Cart';
import { AuthContextProvider } from './auth/auth';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import CategoriesProducts from './components/CategoriesProducts/CategoriesProducts';
import Footer from './components/Footer/Footer';
import { CartContextProvider } from './CartContext/CartContext';
import Checkout from './components/Checkout/Checkout';
import PrivateRoute from './components/Reusable/PrivateRoute/PrivateRoute';
import './responsive.css'

function App() {


  return (
    <div className="App position-relative">
      <Router>
        <AuthContextProvider>
          <CartContextProvider>
            <Header />
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/product/:for/:cate/:pdId">
                <ProductDetail />
              </Route>
              <Route path="/cart">
                <Cart />
              </Route>
              <PrivateRoute path="/my-account">
                <Dashboard />
              </PrivateRoute>
              <PrivateRoute exact path="/checkout">
                <Checkout />
              </PrivateRoute>
              <PrivateRoute path="/wishlist">
                <h4>Wish List</h4>
              </PrivateRoute>
              <Route path="/men/:cate">
                <CategoriesProducts men={true} />
              </Route>
              <Route path="/women/:cate">
                <CategoriesProducts men={false} />
              </Route>
              <Route path="/men">
                <GenderPage gender="men" />
              </Route>
              <Route path="/women">
                <GenderPage gender="women" />
              </Route>
              <Route exact path="/">
                <Banner />
                <ProductsSector />
                <HomeMessage />
                <SomeFeaturedProducts />
              </Route>
              <Route path="*">
                <Error />
              </Route>
            </Switch>
            <Footer />
          </CartContextProvider>
        </AuthContextProvider>
      </Router>
    </div>
  );
}

export default App;