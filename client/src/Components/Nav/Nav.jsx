import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../../Image/Logosinfondo.png'
import style from "../../Styles/StyleNav.module.css"
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { IconContext } from 'react-icons';
import './Nav.css'
import { useSelector } from "react-redux";
import Logout from "../Acount/Logout"
import SearchBar from '../SearchBar/SearchBar'
import { filterData } from "./SidebarData";
import ButtonLogin from "../Acount/ButtonLogin";
import ButtonRegister from "../Acount/ButtonRegister";
import SubNav from './SubNav'


export default function Nav() {
  const token = useSelector(state => state.token);
  const user = useSelector(state => state.user);

  const data = filterData(token, user)



  const [sidebar, setSidebar] = useState(false)



  const showSidebar = () => setSidebar(!sidebar)

  //<li key={index} className={item.cName}>
    //                <Link to={item.path}>
      //                {item.icon}
        //              <span color="#F2F0D5">{item.title}</span>
          //          </Link>
            //      </li>

  return (
    <div id={style.nav}>
      <IconContext.Provider value={{ color: '#F2F0D5' }}>
        <div>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <div className='navbar'>
          <Link className="navbar-brand" to='/'>
            <img className='logo-link' src={logo} alt='logo' />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' >
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose onClick={showSidebar}/>
              </Link>
            </li>
            {
              data.map((item, index) => {
                return <SubNav item={item} key={index} />;
              })
            }
            {
              (!token) ?
                <div className='logRegButton'>
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
          </ul>
        </nav>
      </IconContext.Provider>
      <div className={style.cName}>
        <SearchBar />
        <Link to='/user/noAdmin'>
          Usuario
        </Link>
      </div>
    </div>
  );
}
