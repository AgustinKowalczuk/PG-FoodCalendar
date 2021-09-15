import React from "react";
import { Link } from "react-router-dom";
import logo from '../../Image/Logosinfondo.png'
import style from "../../Styles/StyleNav.module.css"


export default function Footer() {

    return (
    <div id={style.nav} class="navbar navbar-light">
      <div class="container-fluid">
        <Link class="navbar-brand" to = '/'>
          <img width="55%" height="45%" src= {logo} alt='logo'/>
        </Link>
        <h6>© Copyright 2021 - Henry - All Rights Reserved</h6>
      </div>
    </div>
  );
}
