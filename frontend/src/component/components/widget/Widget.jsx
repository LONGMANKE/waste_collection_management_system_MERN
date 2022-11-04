import "./widget.scss"
import { React, useEffect } from "react"
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
// import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import StoreMallDirectoryOutlinedIcon from '@mui/icons-material/StoreMallDirectoryOutlined';
import { useSelector, useDispatch } from "react-redux";
import { getAdminService } from "../../../actions/serviceAction";
import { getAllOrders } from "../../../actions/orderActions";
import { getAllUsers } from "../../../actions/userAction.js";
import { Link } from "react-router-dom";



const Widget = ({ type }) => {

  const dispatch = useDispatch();

  const { services } = useSelector((state) => state.services);

  const { orders } = useSelector((state) => state.AllOrders);

  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getAdminService());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);



  let data;

  


  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        counter: users && users.length,
        link: <Link to="/admin/users"  style={{
          color:"#008710"}}>See all Users</Link>,
        diff: users && users.length,
        icon: <PersonOutlineIcon className="icon"
          style={{
            color: "crimson",
            backgroundColor: "rgba(255, 0, 0, 0.2)",
          }} />
      };
      break;
    case "orders":
      data = {
        title: "ORDERS",
        isMoney: false,
        link: <Link to="/admin/orders"  style={{
          color:"#008710"}}>View all Orders</Link>,
        counter: orders && orders.length,
        diff: orders && orders.length,
        icon: <AddShoppingCartIcon className="icon"
          style={{
            color: "orange",
            backgroundColor: "rgba(0, 128, 0, 0.2)",
          }} />,
      };
      break;
    case "services":
      data = {
        title: "SERVICES",
        isMoney: false,
        counter: services && services.length,
        diff: services && services.length,
        link: <Link to="/admin/services" style={{
          color:"#008710"}}
          >View all Services</Link>,
        icon: <StoreMallDirectoryOutlinedIcon className="icon"
          style={{
            color: "green",
            backgroundColor: "rgba(0, 128, 0, 0.2)",
          }} />,
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        link: <Link to="/admin/transactions" style={{
          color:"#008710"}}
          >See Transactions</Link>,
        icon: <AccountBalanceWalletIcon className="icon"
          style={{
            color: "purple",
            backgroundColor: "rgba(128, 0, 128, 0.2)",
          }} />,
      };
      break;

    default:
      break;
  }




  return (
    <div className="widget">
      <div className="left">
        <div className="title">{data.title}</div>
        <div className="counter">{data.isMoney && "KSH"}{data.counter} </div>
        <div className="link">{data.link}</div>


      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {data.diff}
        </div>
        {data.icon}

      </div>
    </div>
  )
}

export default Widget