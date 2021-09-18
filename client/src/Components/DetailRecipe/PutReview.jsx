import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteReviews, putReviews } from '../../actions';

export default function PutReview({idReview,comm}) {
        const token = useSelector(state => state.token) 
        const dispatch = useDispatch()
        const user= useSelector(state => state.user)
        const [flag, setFlag] = useState(false)
        
        
        console.log(comm,'comment')
        
         function handleSubmit(e){
                e.preventDefault();
          const valor={
                      comment:e.target['comentario'].value,
                      }
                         console.log (valor,'valor')
                         dispatch(putReviews(idReview,valor,token)) 
        }   

       function modificar() {
        setFlag (true)
       }
            
        return (
                <>
                <button onClick={()=>modificar()}>Modificar</button> 
                {flag  ?
                   <form onSubmit={handleSubmit}>
                <div>     
                        <label>{user?.name}</label><br/>
                        <label htmlFor='comentario'>Comentario:</label><br/>
                        <textarea 
                        id='comentario'
                        name='comentario'
                        rows='2'
                        colums='300'
                        defaultValue={comm}
                        
                         ></textarea><br/>
                         <button type='submit'>Modificar</button>
                         
                </div>      
                </form>: <> </>}
               </>
        )         
     
}
