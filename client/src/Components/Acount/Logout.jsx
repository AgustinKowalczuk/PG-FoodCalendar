import React from 'react';
import { useDispatch } from 'react-redux';
import { setUserAndToken } from '../../actions';
import * as GrIcons from "react-icons/gr";



export default function Logout(){  
    const dispatch = useDispatch();
    
    function handleClick() {
        sessionStorage.token = null;
        sessionStorage.user = null;
        dispatch(setUserAndToken({token: null, user: null}));
    }

    return (
        <div>
            <GrIcons.GrLogout onClick={handleClick}>Logout</GrIcons.GrLogout>
        </div>
    )
}