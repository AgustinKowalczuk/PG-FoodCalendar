import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteReviews, getComentarios } from "../../actions";
import PutReview from "./PutReview";
import style from "../../Styles/StyleComent.module.css"
import * as BsIcon from "react-icons/bs"
import swal from 'sweetalert';

export function VerComentarios({id}){

        const comments = useSelector(state => state.comments)
        const token = useSelector(state => state.token);
        const user = useSelector(state => state.user);
        const toggleReviews = useSelector(state => state.toggleReviews)
 
        const dispatch = useDispatch()
        
      useEffect(() => {
              console.log(id,'id')
             dispatch(getComentarios(id));
      }, [dispatch,id,toggleReviews])

      function borrar(idr){

        swal({
                title:'Seguro que quieres eliminar el comentario?',
                icon: "warning",
                buttons: true,
                dangerMode: true,
        }).then( button => {
                if(button){

                        dispatch(deleteReviews(idr,token));
                }
        })
      }
 
        return (
                <div className={style.contentAllComent}>
                        {comments?.map((e)=>{
                                const fecha = new Date(e.date)
                                const mes= fecha.getMonth()+1
                                const dia= fecha.getDate()
                                const anio= fecha.getFullYear()
                                return (
                                        
                                        <div className={style.coment}>
                                                <div className={style.name}>
                                                        <span>{e?.owner.name}:</span>
                                                </div>
                                                <label id={style.diaComent} className={style.textLabel} type='date'>{`${dia}/${mes}/${anio}`}</label>
                                                <div className={style.comentFunction}>
                                                        
                                                        <span className={style.dateComent}>{e.comment}</span>
                                                        {(!!token && user.id === e?.owner.id)? 
                                                                <div className={style.contenBtn}>
                                                                        <PutReview comm={e.comment} idReview={e.id} /> 
                                                                        <button className={style.btn} onClick={()=>borrar(e.id)}><BsIcon.BsTrashFill className={style.icon} /></button> 
                                                                </div> : 
                                                                null
                                                        }
                                                </div>     
                                        </div>
                                )
                        })}

                </div>
        );
}





