import React, { useState, Fragment } from "react";
import MetaData from "../layout/MetaData";
import "./Search.css";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");

    // const searchSubmitHandler = (e) => {
    //     e.preventDefault();
    //     if (keyword.trim()) {
    //       navigate(`/services/${keyword}`);
    //     } else {
    //       navigate("/services");
    //     }
    //   };
    const searchSubmitHandler = (e) => {
      e.preventDefault();
      navigate(keyword.trim() ? `/services/${keyword}` : "/services");
    };
  return (
    <Fragment>
      <MetaData title="Search A Service -- WASTE CMS" />
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a Service ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  )
}

export default Search