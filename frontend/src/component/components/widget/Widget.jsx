import "./widget.scss"
import React from "react"
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';



const Widget = ({type}) => {
  let data;

  //temporary 
  const amount = 100;
  const diff = 20;


  switch(type){
    case "user":
    data = {
      title:"USERS",
      isMoney: false,
      link:"See all users",
      icon: <PersonOutlineIcon className="icon" 
      style={{
        color:"crimson", 
        backgroundColor:"rgba(255, 0, 0, 0.2)",
      }}/>
    };
    break;
    case "order":
      data = {
        title:"ORDERS",
        isMoney: false,
        link:"View all orders",
        icon: <AddShoppingCartIcon className="icon"
        style={{
          color:"orange", 
          backgroundColor:"rgba(0, 128, 0, 0.2)",
        }}/>,
      };
      break;
      case "earning":
        data = {
          title:"EARNINGS",
          isMoney: true,
          link:"View net earnings",
          icon: <MonetizationOnIcon className="icon"
          style={{
            color:"green", 
            backgroundColor:"rgba(0, 128, 0, 0.2)",
          }}/>,
        };
        break;
        case "balance":
        data = {
          title:"BALANCE",
          isMoney: true,
          link:"See details",
          icon: <AccountBalanceWalletIcon className="icon"
          style={{
            color:"purple", 
            backgroundColor:"rgba(128, 0, 128, 0.2)",
          }}/>,
        };
        break;

    default:
      break;
  }




  return (
    <div className="widget">
        <div className="left">
          <div className="title">{data.title}</div>
          <div className="counter">{data.isMoney && "$"} {amount}</div>
          <div className="link">{data.link}</div>


        </div>
        <div className="right">
          <div className="percentage positive">
           <KeyboardArrowUpIcon/>
            {diff}%
          </div> 
          {data.icon}
           
        </div>
    </div>
  )
}

export default Widget