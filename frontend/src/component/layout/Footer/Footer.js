import React from 'react'
// import playStore from "../../../images/playstore.png";
// import appStore from "../../../images/Appstore.png";
import logo from "../../../images/logo.png";

import "./Footer.css"

const Footer = () => {
  return ( 
    <footer className="footer">
      <div className="leftFooter">
        {/* <h4>DOWNLOAD OUR APP</h4> */}
        <h4>KEEP IT CLEAN GREEN</h4>
        <img src={logo} alt="logo" />
        {/* <p>Download App for Android and IOS mobile phone</p> */}
        {/* <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" /> */}
      </div>

      <div className="midFooter">
        <h1>GreenTech Collectors</h1>
        <p>"High quality service is our first priority!"</p>

        <p>Copyrights 2023 &copy; Group 7</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="http://instagram.com/m.b.u.r.u.u">Instagram</a>
        <a href="https://youtube.com/channel/UCY4w6WS1XMPBqIEmPypifVQ">Youtube</a>
        <a href="http://facebook.com/LONGMANKE">Facebook</a>
      </div>
    </footer>
  );
};

export default Footer