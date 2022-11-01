import "./sidebar.scss"
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import StoreMallDirectoryOutlinedIcon from '@mui/icons-material/StoreMallDirectoryOutlined';
import DeliveryDiningOutlinedIcon from '@mui/icons-material/DeliveryDiningOutlined';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import React from "react"
import { Link } from "react-router-dom";
import { logout } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";



const Sidebar = () => {

  const alert = useAlert();
  const dispatch = useDispatch();

  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
  }
  return (
    <div className="sidebar" >
      <div className="top"><span className="logo">Waste CSM Admin</span></div>
      <hr />
      <div className="center">
        <ul>
          <p className="title"> MAIN</p>
          <Link to="/admin/dashboard">
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          </Link>
          <Link to="/admin/users">
            <li>
              <PersonIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <p className="title">LIST</p>
          <Link to="/admin/services">
            <li>
              <StoreMallDirectoryOutlinedIcon className="icon" />
              <span>Services</span>
            </li>
          </Link>
          
          <Link to="/admin/service">
            <li>
              <AddBusinessIcon className="icon" />
              <span>create service</span>
            </li>
          </Link>
           <Link to="/admin/orders">
          <li>
            <DeliveryDiningOutlinedIcon className="icon" />
            <span>Collection Orders</span>
          </li>
          </Link>
          <p className="title">USER</p>
          <Link to="/account">
            <li>
              <PermIdentityIcon className="icon" />
              <span>Profile</span>
            </li>
          </Link>

          <li>
            <ExitToAppIcon className="icon" />
            <span onClickCapture={logoutUser}>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div className="colorOption"></div>
        <div className="colorOption"></div>
      </div>

    </div>
  )
}

export default Sidebar