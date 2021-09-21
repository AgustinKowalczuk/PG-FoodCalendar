import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteSelfUser} from "../../../actions";


export default function DeleteUserOnly ({id}) {
    const dispatch = useDispatch()
    const token = useSelector((state) => state.token);

    function handleClick(id){
        const ok = window.confirm('Deseas borrar tu usuario?')
        if(ok){
        dispatch(deleteSelfUser(id, token))
        }
    }
    return ( 
        <div>
            <button className="btn btn-danger" onClick={() => handleClick(id)}></button>
        </div>
     );
}