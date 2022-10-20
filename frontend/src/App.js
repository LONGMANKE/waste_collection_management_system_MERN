import './App.css';
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./component/layout/Header/Header.js"
import Footer from "./component/layout/Footer/Footer.js"
import WebFont from "webfontloader"
import React from 'react';
import store from "./Store"
import LoginSignUp from './component/User/LoginSignUp.js';
import { loadUser } from './actions/userAction';


function App() {
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
      <Routes>
        <Route exact path="/login" element={<LoginSignUp />} />
      </Routes>
      <Footer />

    </Router>

  );
}

export default App;

