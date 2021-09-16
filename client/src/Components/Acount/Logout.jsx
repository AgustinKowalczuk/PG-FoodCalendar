import React from 'react';
import { useDispatch } from 'react-redux';
import { setUserAndToken } from '../../actions';
import * as GrIcons from "react-icons/gr";

import swal from 'sweetalert';
import style from '../../Styles/StyleLogout.module.css'

export default function Logout(){  
    const dispatch = useDispatch();
    
    function handleClick() {
        sessionStorage.token = null;
        sessionStorage.user = null;
        dispatch(setUserAndToken({token: null, user: null}));
        swal({
            title: "Haz salido de la cuenta",
            text: "Saliste de la cuenta exitosamente",
            icon: "error",
            button: "Aceptar",
        })
    }

    return (
        <div className={style.content}>
            <GrIcons.GrLogout onClick={handleClick}>Logout</GrIcons.GrLogout>
        </div>
    )
}