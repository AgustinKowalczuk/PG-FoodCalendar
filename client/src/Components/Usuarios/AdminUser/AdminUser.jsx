import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setUserForAdmin } from "../../../actions";
import DeleteUser from "./DeleteUser";
import UpdateUser from "./UpdateUser";
import { Link } from "react-router-dom";
import { Grid } from '@nextui-org/react';


export default function AdminUser () {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const userDetails = useSelector((state) => state.adminUsers);

    useEffect(() => {
        dispatch(setUserForAdmin(token))
    }, [dispatch, token])
    console.log(userDetails)
    return ( 
        <div>
            <h3>Usuarios:</h3>
            <Grid.Container gap={2} justify="center">

                {userDetails?.map((e) => (
                    <Grid xs={4}>
                        <Link to={`/user/${e.id}`}>
                        <br/><h6>Nombre: {e.name}</h6>
                        </Link>
                        <h6>Categoría: {e.category}.
                        <UpdateUser
                        id={e.id}
                        category={e.category}/>
                        Correo: {e.email}</h6>
                        <DeleteUser id={e.id}/>
                    </Grid>

                ))}
            </Grid.Container>
        </div>
     );
}