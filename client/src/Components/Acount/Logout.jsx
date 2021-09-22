import React from 'react';
import { useDispatch } from 'react-redux';
import { setUserAndToken, clearInventary, getRecipes, resetPage } from '../../actions';
import * as GrIcons from "react-icons/gr";
import { Button } from '@nextui-org/react';
import swal from 'sweetalert';
import style from '../../Styles/StyleLogout.module.css'
import { IconContext } from 'react-icons';
export default function Logout(){  
    const dispatch = useDispatch();
    
    function validate() {
        swal({
            title: "Estas segurode desloguearte?",
            text: "Puedes perder las recetas guardadas en el inventario",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                handleClick()
            } else {
              swal({
                  title: "No te haz deslogueado",
                  icon: 'error',
                  button: 'aceptar',
              });
            }
          });
    }
    function handleClick() {
        sessionStorage.token = null;
        sessionStorage.user = null;
        dispatch(setUserAndToken({token: null, user: null}));
        swal({
            title: "Haz salido de la cuenta",
            text: "Saliste de la cuenta exitosamente",
            icon: "success",
            button: "Aceptar",
        })
        dispatch(getRecipes(null))
        dispatch(clearInventary())
        dispatch(resetPage())
    }

    return (
        <div className={style.content}>
            <IconContext.Provider value={{ color: '#F2F0D5' }}>
           <Button    onClick={validate}   icon={< GrIcons.GrLogout/>} color="error" flat><span className={style.buttonLog} >Logout</span>  </Button>
           </IconContext.Provider>
        </div>
    )
}