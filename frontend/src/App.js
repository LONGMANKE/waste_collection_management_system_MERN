import './App.css';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./component/layout/Header/Header.js"
import Footer from "./component/layout/Footer/Footer.js"
import WebFont from "webfontloader"
import React from 'react';
import store from "./Store"
import { loadUser } from './actions/userAction';
import ProtectedRoute from './component/Route/ProtectedRoute';
import ProtectedRoute2 from './component/Route/ProtectedRoute2';
import Home from './component/Home/Home'
import LoginSignUp from './component/User/LoginSignUp.jsx';
import Profile from './component/User/Profile';
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from './component/User/ForgotPassword.js';
import ResetPassword from "./component/User/ResetPassword.js";
import UserOptions from "./component/layout/Header/UserOptions.js";
import About from "./component/layout/About/About.js";
import Dashboard from './component/Admin/Dashboard';
import Cart from "./component/Cart/Cart.js";
import ServiceDetails from "./component/Service/ServiceDetails.js"
import Services from "./component/Service/Services"
import UsersList from "./component/Admin/UsersList.js";
import Location from "./component/Cart/Location.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import Payment from "./component/Cart/Payment.js"
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import ServiceList from "./component/Admin/ServiceList.js";
import NewService from "./component/Admin/NewService.js";
import updateService from "./component/Admin/UpdateService.js";
import OrderList from "./component/Admin/OrderList.js";
import OrderList1 from "./component/Collector/OrderList1";
import ProcessOrder from "./component/Admin/ProcessOrder.js";
import ProcessOrder1 from "./component/Collector/ProcessOrder1";
import UpdateUser from "./component/Admin/UpdateUser.js";
import ServiceReviews from "./component/Admin/ServiceReviews.js";
import Contact from "./component/layout/Contact/Contact.js";
import NotFound from "./component/layout/Not Found/NotFound.js";
import Search from "./component/Service/Search";

import NewProduct from "./component/Admin/NewProduct";
import ProductDetails from "./component/Product/ProductDetails.js"
import Products from "./component/Product/Products.js"
// import ServiceReport from './component/Admin/ReportsGenerator/ServiceReport';

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js"; 
import axios from "axios";
import Reports from './component/Admin/Reports';

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })
    store.dispatch(loadUser());
    getStripeApiKey();

  }, [])


  return (
    //in routing the component doesn't work in latest react use  element instead
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      {/* {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path="/process/payment" component={Payment} />
        </Elements>  )}
       */}
      <Routes>
        
          
        <Route exact path="/" element={<Home />} />
        <Route exact path="/services" element={<Services />} />
        <Route exact path="/services/:keyword" element={<Services />} />
        <Route exact path="/service/:id" element={<ServiceDetails />} />

        <Route exact path="/about" element={<About />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/contact" element={<Contact />} />

        <Route exact path="/products" element={<Products />} />
        <Route exact path="/products/:keyword" element={<Products />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
 
        {/* auth */}
        <Route exact path="/login" element={<LoginSignUp />} />
        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route exact path="/password/reset/:token" element={<ResetPassword />} />
        <Route exact path='/me/update' element={<ProtectedRoute component={UpdateProfile} />} />
        <Route exact path='/account' element={<ProtectedRoute component={Profile} />} />
        <Route exact path="/password/update" element={<ProtectedRoute component={UpdatePassword} />} />

        {/* cart */}
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/location" element={<ProtectedRoute component={Location} />} />
        <Route exact path="/order/confirm" element={<ProtectedRoute component={ConfirmOrder} />} />
        <Route exact path="/process/payment" element={stripeApiKey && <Elements stripe={loadStripe(stripeApiKey)}> <Payment /> </Elements>} />
        <Route exact path="/success" element={<ProtectedRoute component={OrderSuccess} />} />
        <Route exact path="/orders" element={<ProtectedRoute component={MyOrders} />} />
        <Route exact path="/order/:id" element={<ProtectedRoute component={OrderDetails} />} />

        {/* admin */}
        <Route isAdmin={true} exact path="/admin/dashboard" element={<ProtectedRoute component={Dashboard} />} />
        <Route isAdmin={true} exact path="/admin/users" element={<ProtectedRoute component={UsersList} />} />
        <Route isAdmin={true} exact path="/admin/services" element={<ProtectedRoute component={ServiceList} />} />
        <Route isAdmin={true} exact path="/admin/service" element={<ProtectedRoute component={NewService} />} />
        <Route isAdmin={true} exact path="/admin/product" element={<ProtectedRoute component={NewProduct} />} />

        <Route isAdmin={true} exact path="/admin/service/:id" element={<ProtectedRoute component={updateService} />} />
        <Route isAdmin={true} exact path="/admin/orders" element={<ProtectedRoute component={OrderList} />} />
        <Route isAdmin={true} exact path="/admin/order/:id" element={<ProtectedRoute component={ProcessOrder} />} />
        <Route isAdmin={true} exact path="/admin/user/:id" element={<ProtectedRoute component={UpdateUser} />} />
        <Route isAdmin={true} exact path="/admin/reviews" element={<ProtectedRoute component={ServiceReviews} />} />
        <Route isAdmin={true} exact path="/admin/reports" element={<ProtectedRoute component={Reports} />} />


        {/*collector*/}
        <Route isAdmin={true} exact path="/collector/orders" element={<ProtectedRoute2 component={OrderList1} />} />
        <Route isAdmin={true} exact path="/collector/order/:id" element={<ProtectedRoute2 component={ProcessOrder1} />} />


        <Route
          component={window.location.pathname === "/process/payment" ? null : NotFound } />
          <Route path="*" element={<NotFound />} />
        
        

      </Routes>



      <Footer />
    </Router>

  );
}

export default App;

