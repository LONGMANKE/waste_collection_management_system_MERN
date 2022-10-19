import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo.png";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const options = {
  burgerColorHover: "#028614",
  logo,
  logoWidth: "20vmax",
  navColor1: "white",
  logoHoverSize: "10px", 
  logoHoverColor: "#028614",
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "1.3vmax",
  link1Color: "rgba(35, 35, 35,0.8)",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "#028614",
  link1Margin: "1vmax",
  profileIconUrl: "/login",
  searchIconUrl: "/search",
  cartIconUrl: "/cart",
  profileIconColor: "rgba(35, 35, 35,0.8)",
  searchIconColor: "rgba(35, 35, 35,0.8)",
  cartIconColor: "rgba(35, 35, 35,0.8)",
  profileIconColorHover: "#028614",
  searchIconColorHover: "#028614",
  cartIconColorHover: "#028614",
  cartIconMargin: "1vmax",
};

const Header = () => {
  return <ReactNavbar
    {...options}
    profileIcon="true"
    ProfileIconElement={AccountCircleIcon }
    searchIcon="true"
    SearchIconElement={SearchIcon}
    cartIcon="true"
    CartIconElement={ShoppingCartIcon}
    SearchIconSize="large"
    cartIconSize="2vmax"
    fontSize="large"
  />;
};

export default Header;