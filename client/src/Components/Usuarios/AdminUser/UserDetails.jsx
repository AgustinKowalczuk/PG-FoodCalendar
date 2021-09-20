import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getComentaryDetail } from "../../../actions";



export default function UserDetails () {
    const {id} = useParams()
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const commentDetails = useSelector((state) => state.userCommentsDetails)
    useEffect(() => {
        dispatch(getComentaryDetail(id, token))
    }, [dispatch, id, token])
    return (
            <div>
                {commentDetails?.map((e)=> {
                        const fecha = new Date(e.date)
                        const mes= fecha.getMonth()+1
                        const dia= fecha.getDate()
                        const anio= fecha.getFullYear()
                        return                 (
                            <ul>
                                <li>{e.owner.name}</li>
                                <li>"{e.comment}"</li>
                                <li>{e.recipe.name}</li>
                                <label
                                type='date'
                                >Fecha: {`${dia}/${mes}/${anio}`}
                                </label>
                            </ul>
                        )
                })}
            </div>
    );
}