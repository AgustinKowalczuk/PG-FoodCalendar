import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setUserForAdmin } from "../../actions";
import { useParams } from "react-router";


export default function AdminUser () {

    const dispatch = useDispatch();
    const {id} = useParams();
    const token = useSelector((state) => state.token);
    const userDetails = useSelector((state) => state.usersAdmin);
    console.log(userDetails)

    useEffect(() => {
        dispatch(setUserForAdmin(id, token))
    }, [dispatch, id])

    return ( 
        <div>
            Olis
        </div>
     );
}