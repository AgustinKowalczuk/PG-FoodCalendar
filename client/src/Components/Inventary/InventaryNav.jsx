import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "../../Styles/StyleNav.module.css"
import * as BsIcons from "react-icons/bs";
import * as AiIcons from "react-icons/ai";
import { IconContext } from 'react-icons';
import './InventaryNav.css'
import { useSelector } from "react-redux";
import Inventary from "./Inventary";


export default function InventaryNav() {
  const token = useSelector(state => state.token);
  

  



  const [sidebar, setSidebar] = useState(false)



  const showSidebar = () => setSidebar(!sidebar)


  return (
    <div className='unBran'>
      <IconContext.Provider value={{ color: '#B1B1AC' }}>
        <div>
          <Link to='#' className='inventary-bars'>
            <BsIcons.BsBookmarkPlus className='iconoReceta' onClick={showSidebar} />
          </Link>
        </div>
        <div className='inventaryNav'>
          
        </div>
        <nav className={sidebar ? 'nav-menu-inv active' : 'nav-menu-inv'}>
          <ul className='av-menu-it-inv' >
            <li className='navbar-toggle-inv'>
              <Link to='#' className='inventary-bars'>
                <AiIcons.AiOutlineClose onClick={showSidebar}/>
              </Link>
            </li>
                <div className='inventaryContainer'>
                  <Inventary />
                </div> 
          </ul>
        </nav>
      </IconContext.Provider>
    </div>
  );
}
