import './App.css';
import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom"
import Header from "./component/layout/Header/Header.js"
import Footer from "./component/layout/Footer/Footer.js"
import WebFont from "webfontloader"
import React from 'react';


function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })
  }, [])


  return (
    <Router>
    <Header />

    <Footer />
    </Router>
  );  
}

export default App;
