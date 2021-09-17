import { User } from "@nextui-org/react";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComentarios } from "../../actions";

export function VerComentarios({id,userId}){

        const comments = useSelector(state => state.comments)
        const token = useSelector(state => state.token);
 
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
                                    <div key={e.id}>
                                    <div>
                                      Usuario:{e?.owner.name}</div>
                                    <label
                                    type='date'
                                         >{`${dia}/${mes}/${anio}`}</label>
                                         
                                         <div>{e?.comment}</div>
                                        
                                        
                                {(!!token&& userId === e?.comment.owner.id)? 
                                <div>
                                <button>Eliminar</button> 
                                <button>Mofificar</button> </div> : <></>}
                                  </div> )

                        })}

                </div>
        );
}





