import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { setUserAndToken } from '../../actions';

export default function Logout(){  
    const dispatch = useDispatch();
    
    function handleClick() {
        sessionStorage.token = null;
        sessionStorage.user = null;
        dispatch(setUserAndToken({token: null, user: null}));
    }

    return (
        <div>
            <button onClick={handleClick}>Logout</button>
        </div>
    )
}
