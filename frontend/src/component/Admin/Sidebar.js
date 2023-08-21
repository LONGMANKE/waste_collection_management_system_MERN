import React from 'react';
import {
	FaAngleRight,
	FaAngleLeft, 
	FaThLarge, 
	FaCog,
	FaSignOutAlt,
	FaBars
} from 'react-icons/fa';
import { NavLink } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import StoreMallDirectoryOutlinedIcon from '@mui/icons-material/StoreMallDirectoryOutlined';
import DeliveryDiningOutlinedIcon from '@mui/icons-material/DeliveryDiningOutlined';
import ReviewsIcon from '@mui/icons-material/Reviews';
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';
import { logout } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";

const ICON_SIZE = 20;
  
function Sidebar({visible, show}) {
	const alert = useAlert();
	const dispatch = useDispatch();
  
	function logoutUser() {
	  dispatch(logout());
	  alert.success("Logout Successfully");
	}

	return (
		<>
			<div className="mobile-nav">
				<button
					className="mobile-nav-btn"
					onClick={() => show(!visible)}
				>
					<FaBars size={24}  />
				</button>
			</div>
			<nav className={!visible ? 'navbar' : ''}>
				<button
					type="button"
					className="nav-btn"
					onClick={() => show(!visible)}
				>
					{ !visible
						? <FaAngleRight size={30} /> : <FaAngleLeft size={30} />}
				</button>
				<div>
					<NavLink
						className="logo"
						to="/"
					>
							<img
								src={require("../../images/logo.png")}
								alt="logo"
							/>
					</NavLink>
					<div className="links nav-top">
						<NavLink to="/admin/dashboard" className="nav-link">
							<FaThLarge size={ICON_SIZE} />
							<span>Dashboard</span>
						</NavLink>
						<NavLink to="/admin/service" className="nav-link">
							<AddIcon size={ICON_SIZE} />
							<span>Create Service</span> 
						</NavLink>
						<NavLink to="/admin/product" className="nav-link">
							<AddIcon size={ICON_SIZE} />
							<span>Create Product</span> 
						</NavLink>
						<NavLink to="/admin/users" className="nav-link">
							<PersonIcon size={ICON_SIZE} />
							<span>All Users </span>
						</NavLink>
						<NavLink to="/admin/services" className="nav-link">
							<StoreMallDirectoryOutlinedIcon size={ICON_SIZE} />
							<span>All Services</span> 
						</NavLink>
						<NavLink to="/admin/orders" className="nav-link">
							<DeliveryDiningOutlinedIcon size={ICON_SIZE} />
							<span>All Orders</span> 
						</NavLink>
						<NavLink to="/admin/reviews" className="nav-link">
							<ReviewsIcon size={ICON_SIZE} />
							<span>Reviews</span> 
						</NavLink>
						<NavLink to="/admin/reports" className="nav-link">
							<DownloadIcon size={ICON_SIZE} />
							<span>Get Reports</span> 
						</NavLink>
						
						
					</div>
				</div>

				<div className="links">
					<NavLink to="/account" className="nav-link">
						<FaCog size={ICON_SIZE} />
						<span>Profile</span> 
					</NavLink>
					<NavLink className="nav-link">
						<FaSignOutAlt size={ICON_SIZE} />
						<span onClickCapture={logoutUser}>Logout</span> 
					</NavLink>
				</div>
			</nav>
		</>
  );
}

export default Sidebar;
