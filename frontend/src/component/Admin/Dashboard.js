import Sidebar from "./Sidebar"
import React, {useState} from 'react';
import Widget from "../components/widget/Widget"
import List from "../components/table/ServiceTable"
import "./dashboard.scss"
// import "./animation.css"

 
const Dashboard = () => {
  const [navVisible, showNavbar] = useState(false);
  return (
    <div className="home">
      <div className={!navVisible ? "page" : "page page-with-navbar"}> <Sidebar visible={ navVisible } show={ showNavbar }/></div>
       <div className="homeContainer"> 
       <h1 id="ServiceListHeading">ADMIN DASHBOARD</h1>
     <div className="widgets">
      <Widget type="user"/>
      <Widget type="orders"/>
      <Widget type="services"/>
      <Widget type="balance"/>
      </div>
      <div className="gg"></div>
      <div className="listContainer">
        <div className="listTitle">Services Preview</div>
        <List/>
      </div>
      </div>
     </div>
  )
}

export default Dashboard