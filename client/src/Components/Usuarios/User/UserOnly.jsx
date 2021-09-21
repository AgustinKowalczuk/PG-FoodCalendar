import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setUserForAdmin } from "../../../actions";
import { useParams } from "react-router";

export default function UserOnly () {
    const {id} = useParams();
    const dispatch = useDispatch();
    const user = useSelector(((state) => state.adminUsers));
    const token = useSelector((state) => state.token);
    useEffect(() => {
        dispatch(setUserForAdmin(id,token))
    }, [dispatch, id, token])
    console.log(user)
    return ( 
        <div>
            <div>
                <h4>Detalles:</h4>
                {user?.map((e) => (
                    <h5>{e.name}</h5>
                ))}
            </div>
        </div>
     );
}