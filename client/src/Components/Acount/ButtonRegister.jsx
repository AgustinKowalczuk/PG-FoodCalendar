import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@nextui-org/react';
import * as BsIcons from "react-icons/bs"


export default function ButtonLogin() {
    return (
        <div className="registerDiv">
            <Link to="/acount/register" className="registerLink" >
            
            <Button  icon={<BsIcons.BsFillPeopleFill/> }>Registrarse</Button>
            </Link>
        </div>
    )
}
