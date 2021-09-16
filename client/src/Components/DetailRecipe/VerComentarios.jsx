import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComentarios } from "../../actions";

export function VerComentarios({id}){

        const comments = useSelector(state => state.comments)
        const dispatch = useDispatch()

      useEffect(() => {
             dispatch(getComentarios(id));
      }, [dispatch,id])
        return (
                <div>
                        {comments?.map((e)=>{
                          const fecha = new Date(e.date)
                           const mes= fecha.getMonth()+1
                           const dia= fecha.getDate()
                           const anio= fecha.getFullYear()
                            return (
                                    <div>
                                    <div>
                                      Usuario:{e.owner.name}</div>
                                    <label
                                    type='date'
                                         >{`${dia}/${mes}/${anio}`}</label>
                                         
                                         <div>{e.comment}</div>
                                         </div>
                                         )
                        })}

                </div>
        );
}





