import Sidebar from "./Sidebar"
import Widget from "../components/widget/Widget"
import List from "../components/table/ServiceTable"
import "./dashboard.scss"
import React from "react"


const Dashboard = () => {
  return (
    <div className="home">
      <div className="Sidebar"> <Sidebar/></div>
       <div className="homeContainer"> 
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