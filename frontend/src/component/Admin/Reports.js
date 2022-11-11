import Sidebar from "./Sidebar"
import React, {useState} from 'react';
import ReportsCard from "./ReportsGenerator/ReportsCard"
import List from "../components/table/ServiceTable"
import "./dashboard.scss"
// import "./animation.css"

 
const   Reports = () => {
  const [navVisible, showNavbar] = useState(false);
  return (
    <div className="home">
      <div className={!navVisible ? "page" : "page page-with-navbar"}> <Sidebar visible={ navVisible } show={ showNavbar }/></div>
       <div className="homeContainer"> 
       <h1 id="ServiceListHeading">DOWNLOAD REPORTS</h1>
     <div className="widgets">
      <ReportsCard type="user"/>
      <ReportsCard type="orders"/>
      <ReportsCard type="services"/>
      {/* <ReportsCard type="balance"/> */}
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

export default Reports