import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../../actions";

export default function UpdateUser ({id, category}) {

    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);

    function handleClick(){
        const ok = window.confirm('Deseas cambiar de categoría a este usuario?')
        if(ok){
            if(category === 'User'){
                category= 'Admin';
            } else if(category === 'Admin'){
                category= 'User';
            }
            console.log(category)
        dispatch(updateUser(id,{category}, token))
        }
    }
    return ( 
        <div>
            <button onClick={() => handleClick(id)}>Cambiar categoría</button>
        </div>
     );
}