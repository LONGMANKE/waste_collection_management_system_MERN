import Navbar from "../components/navbar/Navbar"
import Sidebar from "../components/sidebar/Sidebar"
import Widget from "../components/widget/Widget"
import List from "../components/table/Table"
import "./home.scss"
import React from "react"


const Home = () => {
  return (
    <div className="home">
      <div className="Sidebar"> <Sidebar/></div>
       <div className="homeContainer"> 
     <div className="widgets">
      <Widget type="user"/>
      <Widget type="order"/>
      <Widget type="earning"/>
      <Widget type="balance"/>
      </div>
      <div className="gg"></div>
      <div className="listContainer">
        <div className="listTitle">Latest transaction</div>
        <List/>
      </div>
      </div>
     </div>
  )
}

export default Home