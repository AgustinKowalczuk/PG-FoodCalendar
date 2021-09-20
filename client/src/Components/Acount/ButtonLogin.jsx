import React from 'react'
import { Link } from 'react-router-dom'
import * as AiIcons from "react-icons/ai";
import { Button } from '@nextui-org/react';


export default function ButtonLogin() {
    return (
        <div className="loginDiv">
            <Link to="/acount/login" className="loginLink" >
            
            <Button  animated="true" icon={<AiIcons.AiOutlineLogin/>} color="success">Login </Button>
            </Link>
        </div>
    )
}
