import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { postComentario } from '../../actions';


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
                <div>
                        <label>{user?.name}</label><br/>
                        <label htmlFor='comentario'>Comentario:</label><br/>
                        <textarea 
                        id='comentario'
                        name='comentario'
                        placeholder='Ingrese su comentario'
                        rows='2'
                        colums='300'
                         ></textarea><br/>
                         <button type='submit'>Comentar</button>
                         
                </div>      
                </form>
        )
}
