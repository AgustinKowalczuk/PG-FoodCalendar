import React from "react";
import { useSelector } from "react-redux";
import DeleteUser from "../AdminUser/DeleteUser";
import UserPasswordRecovery from "./UserPasswordRecovery";

export default function UserOnly() {

    const user = useSelector((state) => state.user)
    console.log(user)
    return ( 
        <div>
            <h4>Detalles del usuario:</h4>
            <div>
                <label>Nombre: {user.name}</label>
            </div>
            <div>
                <label>Apellido: {user.surname}</label>
            </div>
            <div>
                <label>Email: {user.email}</label>
            </div>
            <div>
                <label>Eliminar Usuario</label>
                <DeleteUser/>
            </div>
            <div>
                <UserPasswordRecovery/>
            </div>
            <button>Aceptar</button>
            <button>Modificar datos de usuario</button>
        </div>
     );
}