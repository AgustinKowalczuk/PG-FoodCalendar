import React from 'react';
import { useDispatch } from 'react-redux';
import { setUserAndToken } from '../../actions';
import * as GrIcons from "react-icons/gr";
import { IconContext } from 'react-icons';


export default function Logout(){  
    const dispatch = useDispatch();
    
    function handleClick() {
        sessionStorage.token = null;
        sessionStorage.user = null;
        dispatch(setUserAndToken({token: null, user: null}));
    }

    return (
        <div>
             <IconContext.Provider value={{ color: '#F2F0D5' }}>
            <span> <GrIcons.GrLogout onClick={handleClick}/> Logout</span>
            </IconContext.Provider>
        </div>
    )
}