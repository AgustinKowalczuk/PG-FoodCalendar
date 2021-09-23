import React, { useState } from 'react';
import { Link } from 'react-router-dom';







const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <div className='menu-contenedor'>
      <Link to={item.path} className={item.cName} onClick={item.subNav && showSubnav}>
        <div className='icono-menu'>
          {item.icon}
                
          <span className='sliderLabel'>{item.title}</span>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </Link>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <Link className='linkDropdown' to={item.path} key={index}>
              {item.icon}
              <label className='sliderLabel'>{item.title}</label>
            </Link>
          );
        })}
    </div>
  );
};

export default SubMenu;