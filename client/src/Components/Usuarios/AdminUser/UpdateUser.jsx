import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../../actions";
import swal from 'sweetalert';

export default function UpdateUser ({id, category}) {

    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);

    function handleClick(){
        
        swal({
            title: '¿Seguro de cambiar al usuario?',
            icon: 'warning',
            buttons: true,
            dangerMode: true
        }).then((value) =>{

            if(value){
                if(category === 'User'){
                    category= 'Admin';
                } else if(category === 'Admin'){
                    category= 'User';
                }
                dispatch(updateUser(id,{category}, token))
            }
        }).catch( () => {
            swal({
                title: 'Se cambió el usuario',
                icon: 'error',
                button: 'Aceptar'
            })
        })
    }
    return ( 
        <div>
            <button className="btn btn-danger" onClick={() => handleClick(id)}>Cambiar categoría</button>
        </div>
     );
}