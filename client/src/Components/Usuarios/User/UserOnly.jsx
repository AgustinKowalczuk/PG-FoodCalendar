import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteUser from "../AdminUser/DeleteUser";
import UserPasswordRecovery from "./UserPasswordRecovery";
import { putUserDetails } from "../../../actions";
import PutUser from './PutUser'
import style from "../../../Styles/StylesUser.module.css"
import swal from 'sweetalert';
import * as MdIcon from "react-icons/md"

export default function UserOnly() {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const token = useSelector((state) => state.token);

    const name = ()=> {
        swal({
            title: 'Modificar nombre',
            content: "input",
            buttons: true,
            dangerMode: true,
        })
        .then((name) =>{
            dispatch(putUserDetails({name: name}, token))
        })
        .catch(error => {
            swal({
                title: 'No se a cambiado el nombre',
                icon: 'error',
                button: 'Aceptar'
            })
        })
    }
    
    const surname = ()=> {
        swal({
            text: 'Modificar',
            content: "input",
            buttons: true,
            dangerMode: true,
        })
        .then((surname)=>{
            dispatch(putUserDetails({surname : surname}, token))
        })
        .catch(error=>{
            swal({
                title: 'No se a cambiado el apellido',
                icon: 'error',
                button: 'Aceptar'
            })
        })
    }
    const emailChamge = ()=> {
        swal({
            text: 'Modificar',
            content: "input",
            buttons: true,
            dangerMode: true,
        })
        .then ((email)=>{
            dispatch(putUserDetails({email: email},token))
        })
        .catch(error => {
            swal({
                title: 'No se a cambiado el email',
                icon: 'error',
                button: 'Aceptar'
            })
        })
    }
 console.log (user)
    const newPassword = () => {
        swal({
            title: 'Escribe tu contraseña',
            icon: 'info',
            content: "input",
            buttons: true,
            dangerMode: true,
        }).then((password) => {
            if( !password) throw Error
            
            dispatch(putUserDetails({password: password},token))
        })
        .catch(error => {
            swal({
                title: 'No se a cambiado la contraseña',
                icon: 'error',
                button: 'Aceptar'
            })
        })
    }
    return ( 
        <div className={style.content}>
            <h4>Detalles del usuario:</h4>
            <div className={style.dataCard}>
                <div className={style.name}>
                    <label>Nombre: {user.name}</label> <button className={style.btn} onClick={name}><MdIcon.MdModeEdit className={style.icon}/></button>
                </div>
                <div className={style.apellido}>
                    <label>Apellido: {user.surname}</label><button className={style.btn} onClick={surname}><MdIcon.MdModeEdit className={style.icon}/></button>
                </div>
                <div className={style.gmail}>
                    <label>Email: {user.email}</label> <button className={style.btn} onClick={emailChamge}><MdIcon.MdModeEdit className={style.icon}/></button>
                </div>
                <div className={style.btn1}>
                    <button  id={style.btn2} onClick={newPassword}>Cambiar contraseña</button>
                </div>
            </div>
            <div className={style.exit}>
                <label>Eliminar Usuario</label>
                <DeleteUser/>
            </div>
        </div>
     );
}