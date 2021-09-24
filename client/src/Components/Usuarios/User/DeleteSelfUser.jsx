import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteSelfUser, setUserAndToken, getRecipes, clearInventary, resetPage } from "../../../actions";
import swal from 'sweetalert';

export default function DeleteSelfUser () {
    const dispatch = useDispatch()
    const token = useSelector((state) => state.token);

    function handleClick(){
        swal({
            title: '¿Seguro que quieres eliminar tu usuario?',
            icon: 'warning',
            buttons: true,
            dangerMode: true
        }).then((value) => {
            if(value){
                dispatch(deleteSelfUser(token))
                sessionStorage.token = null;
                sessionStorage.user = null;
                dispatch(setUserAndToken({token: null, user: null}));
                dispatch(getRecipes(null))
                dispatch(clearInventary())
                dispatch(resetPage())
                localStorage.clear();
            }
        })
        .catch((error) => {
            swal({
                title: 'No se eliminó al usuario',
                icon: 'error',
                button: 'Aceptar',
            })
        })
        
    }
    return ( 
        <div>
            <button className="btn btn-danger" onClick={() => handleClick()}>X</button>
        </div>
     );
}