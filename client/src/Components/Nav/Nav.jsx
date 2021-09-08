import React from "react";
import { Link } from "react-router-dom";
import logo from '../../Image/Logosinfondo.png'
import style from "../../Styles/StyleNav.module.css"



export default function Nav() {

  return (
    <div id={style.nav} class="navbar navbar-light bg-light">
      <div class="container-fluid">
        <Link class="navbar-brand" to='/'>
          <img width="55%" height="45%" src={logo} alt='logo' />
        </Link>
        <div id={style.noMargin} class="navbar-nav me-auto mb-2 mb-lg-0">
          <Link id={style.link} class="nav-link active" to="/create/recipe">Crear receta</Link>
        </div>
      </div>
    </div>
  );
}
