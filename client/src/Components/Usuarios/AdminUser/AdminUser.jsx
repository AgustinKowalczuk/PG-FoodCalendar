import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setUserForAdmin } from "../../../actions";
import DeleteUser from "./DeleteUser";
import UpdateUser from "./UpdateUser";
import { Link } from "react-router-dom";
import { Grid } from '@nextui-org/react';
import style from '../../../Styles/StyleAcountList.module.css'

export default function AdminUser () {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const userDetails = useSelector((state) => state.adminUsers);

    useEffect(() => {
        dispatch(setUserForAdmin(token))
    }, [dispatch, token])
    return ( 
        <div className={style.content}>
            <h1>Usuarios</h1>
            <Grid.Container gap={2} justify="center">
                {userDetails?.map((e) => (
                    <Grid xs={12} md={6}>
                        <div className={style.contentData}>
                            <div className={style.name}>
                                <h3>{e.name}</h3>  
                            </div>
                            <div>
                                <Link to={`/reviews/user/${e.id}`}>
                                <h5>Ver comentarios de este usuario</h5>
                                </Link>
                            </div>
                            <div className={style.category}>
                                <h5>Categoría: {e.category}</h5>
                            </div>
                            <div className={style.gmail}>
                                <h5> Correo: {e.email}</h5>
                            </div>
                            <div className={style.change}>
                            <UpdateUser
                                id={e.id}
                                category={e.category}/>
                            </div>
                            <div className={style.delete}>
                                <DeleteUser id={e.id}/>
                            </div>
                        </div>
                    </Grid>

                ))}
            </Grid.Container>
        </div>
     );
}