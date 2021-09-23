import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../../Image/Logosinfondo.png';
import style from "../../Styles/StyleNav.module.css";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { IconContext } from 'react-icons';
import './Nav.css';
import { useSelector } from "react-redux";
import Logout from "../Acount/Logout"
import SearchBar from '../SearchBar/SearchBar'
import { filterData } from "./SidebarData";
import ButtonLogin from "../Acount/ButtonLogin";
import ButtonRegister from "../Acount/ButtonRegister";
import SubNav from './SubNav';

export default function Nav() {
  const token = useSelector(state => state.token);
  const user = useSelector(state => state.user);

  const data = filterData(token, user)



  const [sidebar, setSidebar] = useState(false)



  const showSidebar = () => setSidebar(!sidebar)


  return (
    <div id={style.nav}>
      <IconContext.Provider value={{ color: '#F2F0D5' }}>
        <div className={style.logos}>
        
          <Link className="navbar-brand" id={style.imag} to='/'>
            <img className={style.img} src={logo} alt='logo' />
          </Link>
       
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' >
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose onClick={showSidebar} />
              </Link>
            </li>
            <div className='map-container'>
            {
              data.map((item, index) => {
                return (
                  <li key={`data-${index}`}>
                    <SubNav item={item} />
                  </li>
                )
              })
            }
            </div>
            <div className='button-account'>
            {
              (!token) ?
                <div>
                  < ButtonLogin />
                  < ButtonRegister />
                </div> :
                null
            }
            {
              (!!token) ?
                <div>
                  <Logout />
                </div> :
                null
            }
              </div>
          </ul>
        </nav>
      </IconContext.Provider>
      <div className={style.cName}>
        <SearchBar />
        <div>
          {
            (!!token) ?
            <div className='saludito'>
              <span>Hola {user.name} !</span>
            </div> :
            null
          }
        </div>
      </div>
    </div>
  );
}
