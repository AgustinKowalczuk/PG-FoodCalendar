import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from '../../Image/Logosinfondo.png';
import style from "../../Styles/StyleNav.module.css";
import Logout from "../Acount/Logout";

export default function Nav() {
  const token = useSelector(state => state.token);
  const user = useSelector(state => state.user);

  return (
    <div id={style.nav} class="navbar navbar-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to='/'>
          <img width="55%" height="45%" src={logo} alt='logo' />
<<<<<<< HEAD
        </Link>
        <div id={style.noMargin} className="navbar-nav me-auto mb-2 mb-lg-0">
          <Link id={style.link} className="nav-link active" to="/create/recipe">Crear receta</Link>
        </div>
        <div id={style.noMargin} className="navbar-nav me-auto mb-2 mb-lg-0">
          <Link id={style.link} className="nav-link active" to="/create/recipe" to='/acount/register'>Registrar</Link>
        </div>
        <div>
          <Link id={style.link} className="nav-link active" to='/acount/login' >Login</Link>
        </div>
        <div>
          <Link id={style.link}  className="nav-link active" to='/calendar/user' >Tus Calendarios</Link>
        </div>
        <div>
          <Link id={style.link} className="nav-link active" to='/calendar' >Ver Calendarios</Link>
        </div>
        <div  id={style.noMargin} className="navbar-nav me-auto mb-2 mb-lg-0">
          <Link id={style.link} className="nav-link active" to="/shop">
            Calendar
            </Link>
        </div>
        
=======
        </Link>         
        {(!token) ?
         <div id={style.noMargin} className="navbar-nav me-auto mb-2 mb-lg-0">
          <Link className="nav-link active" to="/create/recipe" to='/acount/register'>Registrar</Link>
        </div> :
        <></>
        } 
        {!!token ? 
          <div>            
            <div id={style.noMargin} className="navbar-nav me-auto mb-2 mb-lg-0">
            <Link className="nav-link active" to='/' >
              <Logout />
            </Link>
            </div>
            <div id={style.noMargin} className="navbar-nav me-auto mb-2 mb-lg-0">
              <Link id={style.link} className="nav-link active" to="/create/recipe">Crear receta</Link>
            </div>
            <div>
              <Link className="nav-link active" to='/calendar/user' >Tus Calendarios</Link>
            </div>            
          </div>          
           :
          <div>
            <Link className="nav-link active" to='/acount/login' >Login</Link>
          </div>
        } 
        {(!!token && user.category === 'Admin') ?
          <div>
            <Link className="nav-link active" to='/calendar' >Ver Calendarios</Link>
          </div> 
           :
          <></>    
        } 
        <div  id={style.noMargin} className="navbar-nav me-auto mb-2 mb-lg-0">
          <Link className="nav-link active" to="/shop">
            Armá tu calendario
          </Link>
        </div>        
>>>>>>> CopiaSeguridad
      </div>
    </div>    
  );
}