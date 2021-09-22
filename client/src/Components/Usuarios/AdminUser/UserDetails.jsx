import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getComentaryDetail } from "../../../actions";
import styles from "../../../Styles/StyleAllComent.module.css"


export default function UserDetails () {
    const {id} = useParams()
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const commentDetails = useSelector((state) => state.userCommentsDetails)
    useEffect(() => {
        dispatch(getComentaryDetail(id, token))
    }, [dispatch, id, token])
    return (
            <div className={styles.content}>
                {commentDetails.length > 0 ?
                    commentDetails?.map((e)=> {
                            const fecha = new Date(e.date)
                            const mes= fecha.getMonth()+1
                            const dia= fecha.getDate()
                            const anio= fecha.getFullYear()
                            return                 (
                                <ul className={styles.contentData}>
                                    <li className={styles.name}>{e.owner.name}</li>
                                    <li className={styles.comment}>"{e.comment}"</li>
                                    <li className={styles.recipe}>{e.recipe.name}</li>
                                    <label
                                    className={styles.day}
                                    type='date'
                                    >Fecha: {`${dia}/${mes}/${anio}`}
                                    </label>
                                </ul>
                            )
                    }) : <h5>Este usuario no tiene comentarios</h5>}
            </div>
    );
}