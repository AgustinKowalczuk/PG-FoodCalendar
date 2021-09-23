import React from 'react'
import { Link } from 'react-router-dom'
import * as AiIcons from "react-icons/ai";
import { Button } from '@nextui-org/react';
import style from '../../Styles/StyleLogout.module.css'

export default function ButtonLogin() {
    return (
        <div className="loginDiv">
            <Link to="/acount/login" className="loginLink" >
            
            <Button  animated="true" icon={<AiIcons.AiOutlineLogin/>} color="success"><span className={style.buttonLog2} >Login</span> </Button>
            </Link>
        </div>
    )
}