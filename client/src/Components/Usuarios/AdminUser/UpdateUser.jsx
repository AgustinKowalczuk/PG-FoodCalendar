import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../../actions";

export default function UpdateUser ({id, category, surname}) {

    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);

    function handleClick(){
        const ok = window.confirm('Deseas cambiar de categoría a este usuario?')
        if(ok){
            if(category === 'User' && surname === 'User'){
                category= 'Admin';
                surname= 'Admin';
            } else if(category === 'Admin' && surname === 'Admin'){
                category= 'User';
                surname= 'User';
            }
            console.log(category, surname)
        dispatch(updateUser(id, token))
        }
    }
    return ( 
        <div>
            <button onClick={() => handleClick(id)}>Cambiar categoría</button>
        </div>
     );
}