import { putUserDetails } from "../../../actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

export default function PutUser () {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);
    const [flag, setFlag] = useState(false)

    useEffect(() => {
        if(user){sessionStorage.user = JSON.stringify(user);}
    },[user])

    const initialValues = {
        name: user.name,
        surname: user.surname,
        email: user.email,
        password: user.password
    }

    function handleSubmit(e){
        e.preventDefault();
        const values = {
            name: e.target.name.value,
            surname: e.target.surname.value,
            email: e.target.email.value
        }
        console.log(values)
        dispatch(putUserDetails(values, token))
    }

    function modificar() {
        setFlag (true)
       }
    return ( 
        <div>
            <button onClick={()=>modificar()}>Modificar</button>
            {flag &&
                <form onSubmit={handleSubmit}>
                                <h4>Detalles del usuario:</h4>
            <div>
                <label>Nombre: {user.name}</label>
                <input
                name='name'
                type="text"
                id='name'
                defaultValue={initialValues.name}/>
            </div>
            <div>
                <label>Apellido: {user.surname}</label>
                <input
                name='surname'
                type="text"
                id='surname'
                defaultValue={initialValues.surname}/>
            </div>
            <div>
                <label>Email: {user.email}</label>
                <input
                name='email'
                type="email"
                id='email'
                defaultValue={initialValues.email}/>
            </div>
            <button type='submit'>Guardar Cambios</button>
                </form>
            }
        </div>
     );
}