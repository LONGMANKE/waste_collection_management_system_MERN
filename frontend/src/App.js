import './App.css';
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./component/layout/Header/Header.js"
import Footer from "./component/layout/Footer/Footer.js"
import WebFont from "webfontloader"
import React from 'react';
import store from "./Store"
import { loadUser } from './actions/userAction';
import ProtectedRoute from './component/Route/ProtectedRoute';
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
import UsersList from "./component/Admin/UsersList.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
// import Payment from "./component/Cart/Payment.js"


function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })
    store.dispatch(loadUser());

  }, [])


  return (
    //in routing the component doesn't work in latest react use  element instead
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<LoginSignUp />} />
        <Route exact path="/services/:id" element={<ServiceDetails />} />

        <Route exact path='/me/update' element={<ProtectedRoute component={UpdateProfile} />} />
        <Route exact path='/account' element={<ProtectedRoute component={Profile} />} />
        <Route exact path='/admin/dashboard' element={<ProtectedRoute component={Dashboard} />} />
        <Route exact path="/password/update" element={<ProtectedRoute component={UpdatePassword} />} />

        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route exact path="/password/reset/:token" element={<ResetPassword />} />
        <Route exact path="/admin/users" element={<ProtectedRoute component={UsersList} />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/shipping" element={<ProtectedRoute component={Shipping} />} />
        <Route exact path="/order/confirm" element={<ProtectedRoute component={ConfirmOrder} />} />
        {/* <Route exact path="/process/payment" element={<ProtectedRoute component={Payment} />} /> */}

        <Route exact path="/about" element={<About />} />

      </Routes>
      <Footer />

    </Router>

  );
}

export default App;

