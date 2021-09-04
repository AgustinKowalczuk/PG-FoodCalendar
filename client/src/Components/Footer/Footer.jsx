import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar"
import logo from '../../Image/Logo_RC.jpg'
import style from "../../Styles/StyleNav.module.css"



export default function Footer() {

    return (
    <div id={style.nav} class="navbar navbar-light bg-light">
      <div class="container-fluid">
        <Link class="navbar-brand" to = '/'>
          <img width="55%" height="45%" src= {logo} alt='logo'/>
        </Link>
        <h6>© Copyright 2021 - Henry - All Rights Reserved</h6>
        <SearchBar/>
      </div>
    </div>
  );
}
