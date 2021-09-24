import React, { useState } from 'react';
import { Link } from 'react-router-dom';







const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <div className='menu-contenedor'>
      <div  className={item.cName}>
      <Link to={item.path} onClick={item.subNav && showSubnav}>
        <div className='icono-menu'>
          {item.icon}
                
          <span className='sliderLabel'>{item.title}</span>
        </div>
        <div className='flechita'>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </Link>
      </div>
    
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <div className='linkDropdown'>
            <Link  to={item.path} key={index}>
              {item.icon}
              <span className='sliderLabel'>{item.title}</span>
            </Link>
            </div>
          );
        })}
    </div>
  );
};

export default SubMenu;