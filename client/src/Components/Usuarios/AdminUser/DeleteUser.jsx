import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteUserForAdmin} from "../../../actions";


export default function DeleteUser ({id}) {
    const dispatch = useDispatch()
    const token = useSelector((state) => state.token);

    function handleClick(id){
        const ok = window.confirm('Deseas borrar a este usuario?')
        if(ok){
        dispatch(deleteUserForAdmin(id, token))
        }
    }
    return ( 
        <div>
            <button className="btn btn-danger" onClick={() => handleClick(id)}>X</button>
        </div>
     );
}