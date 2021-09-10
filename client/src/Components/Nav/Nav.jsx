import React from "react";
import { Link } from "react-router-dom";
import logo from '../../Image/Logosinfondo.png'
import style from "../../Styles/StyleNav.module.css"



export default function Nav() {

  return (
    <div id={style.nav} class="navbar navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to='/'>
          <img width="55%" height="45%" src={logo} alt='logo' />
        </Link>
        <div id={style.noMargin} className="navbar-nav me-auto mb-2 mb-lg-0">
          <Link id={style.link} className="nav-link active" to="/create/recipe">Crear receta</Link>
        </div>
        <div id={style.noMargin} className="navbar-nav me-auto mb-2 mb-lg-0">
          <Link className="nav-link active" to="/create/recipe" to='/acount/register'>Registrar</Link>
        </div>
        <div>
          <Link className="nav-link active" to='/acount/login' >Login</Link>
        </div>
        <div  id={style.noMargin} className="navbar-nav me-auto mb-2 mb-lg-0">
          <Link className="nav-link active" to="/shop">
            Calendar
            </Link>
        </div>
        
      </div>
    </div>
  );
}