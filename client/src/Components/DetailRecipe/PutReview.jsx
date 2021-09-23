import React, { useState } from 'react'
import { MdImportContacts } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { putReviews } from '../../actions';
import * as MdIcon from "react-icons/md"
import swal from 'sweetalert';
import styles from '../../Styles/StyleSendComent.module.css'

export default function PutReview({idReview,comm}) {

        const token = useSelector(state => state.token) 
        const dispatch = useDispatch()
        const user= useSelector(state => state.user)

       function modificar() {
                swal({
                        text: 'Modifique su comentario',
                        content: "input",
                        buttons: true,
                        dangerMode: true,
              })
              .then( coment => {
                if (!coment) throw null;

                dispatch(putReviews(idReview,{comment: coment},token)) 
                return swal({
                        title: "Comentario modificado",
                        icon: "success",
                        button: 'Aceptar'
                })
              })
              .catch(err => {
               
                  swal({
                        title: "No se modifico el comentario",
                        icon: 'error',
                        button: 'Aceptar'
                  });
               
              });
       }
            
        return (
                <>
                <button className={styles.btn} onClick={()=>modificar()}><MdIcon.MdModeEdit className={styles.icon}/></button> 
               </>
        )         
     
}
