import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@nextui-org/react';
import * as BsIcons from "react-icons/bs"
import style from '../../Styles/StyleLogout.module.css'

export default function ButtonLogin() {
    return (
        <div className="registerDiv">
            <Link to="/acount/register" className="registerLink" >
            
            <Button  icon={<BsIcons.BsFillPeopleFill/> }><span className={style.buttonLog2}>Registrarse</span></Button>
            </Link>
        </div>
    )
}
