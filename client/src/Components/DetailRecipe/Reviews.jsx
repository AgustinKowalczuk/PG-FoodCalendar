import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { postComentario } from '../../actions';
import style from "../../Styles/StyleComent.module.css"
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
                <form onSubmit={handleSubmit}>
                <div className={style.contenSendComent}>
                        <label className={style.textLabel} htmlFor='comentario'></label>
                        <input 
                        className={style.comentBox}
                        id='comentario'
                        name='comentario'
                        placeholder='Ingrese su comentario'
                        rows='2'
                        colums='300'
                                />      
                   <button className={style.btn} type='submit'><IoIcons.IoSend/></button>
                </div>      
                </form>
        )
}
