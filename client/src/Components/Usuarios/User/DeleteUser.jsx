import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteSelfUser} from "../../../actions";
import swal from 'sweetalert';

export default function DeleteUserOnly ({id}) {
    const dispatch = useDispatch()
    const token = useSelector((state) => state.token);

    function handleClick(id){
        
        swal({
            title: 'Seguro de eliminar el comentario?',
            icon: 'warning',
            buttons: true,
            dangerMode: true
        }).then((value) => {
            if(value){
                dispatch(deleteSelfUser(id, token))
            }
        })
        .catch((error) => {
            swal({
                title: 'No se borro al usuario',
                icon: 'error',
                button: 'Aceptar',
            })
        })
        
    }
    return ( 
        <div>
            <button className="btn btn-danger" onClick={() => handleClick(id)}></button>
        </div>
     );
}