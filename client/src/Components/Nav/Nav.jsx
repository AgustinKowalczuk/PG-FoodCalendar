import React from "react";
import { Link, withRouter } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar"
import logo from '../../Image/Logo_RC.jpg'

export default function Nav(props) {

    return (
    <div class="navbar navbar-light bg-light">
      <div class="container-fluid">
        <Link class="navbar-brand" to = '/'>
          <img width="55%" height="45%" src= {logo} alt='logo'/>
        </Link>
        <SearchBar/>
      </div>
    </div>
  );
}
