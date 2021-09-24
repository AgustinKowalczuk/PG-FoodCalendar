import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteUserForAdmin} from "../../../actions";
import swal from 'sweetalert';

export default function DeleteUser ({id}) {
    const dispatch = useDispatch()
    const token = useSelector((state) => state.token);

    function handleClick(id){
        
        swal({
            title: "¿Estás seguro de eliminar al usuario?",
            text: "¡Una vez eliminado no hay vuelta atrás!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                dispatch(deleteUserForAdmin(id, token))
            } else {
              swal({
                  title: "Usuario no eliminado",
                  icon:'error',
                  button:'Aceptar'
              });
            }
          });
        
    }
    return ( 
        <div>
            <button className="btn btn-danger" onClick={() => handleClick(id)}>X</button>
        </div>
     );
}