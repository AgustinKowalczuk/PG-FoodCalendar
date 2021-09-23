import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { postComentario } from '../../actions';
import style from '../../Styles/StyleSendComent.module.css'
import * as IoIcons from "react-icons/io5";

export default function Reviews({id}) {
        
        const token = useSelector(state => state.token) 
        const dispatch = useDispatch()
        const user= useSelector(state => state.user)
        
        function handleSubmit(e){
                e.preventDefault();
            const valor={
                      comment:e.target['comentario'].value,
                      }
                         console.log (valor,'valor')
               dispatch(postComentario(valor,id,token))
        }    
        return (
                <form className={style.form} onSubmit={handleSubmit}>
                        <div className={style.content}>
                                <label className={style.label} htmlFor='comentario'>Comentario:</label>
                                <input 
                                className={style.input}
                                id='comentario'
                                name='comentario'
                                placeholder='Ingrese su comentario'
                                rows='2'
                                colums='300'
                                />
                                <button className={style.btn} type='submit'><IoIcons.IoSend className={style.icon}/></button>
                                
                        </div>      
                </form>
        )
}
