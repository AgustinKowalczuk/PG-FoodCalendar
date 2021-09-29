import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { putReviews } from '../../actions';
import * as MdIcon from "react-icons/md";
import swal from 'sweetalert';
import styles from '../../Styles/StyleSendComent.module.css'

export default function PutReview({idReview,comm}) {

        const token = useSelector(state => state.token) 
        const dispatch = useDispatch()

       function modificar() {
                swal({
                        title: 'Modifica tu comentario',
                        content: {
                                element: 'input',
                                attributes: {
                                        value: `${comm}`, 
                                        type: "text",
                                }
                        },
                        buttons: true,
                        dangerMode: true,
              })
              .then( coment => {
                if (!coment) throw new Error('No se modificó el comentario');

                dispatch(putReviews(idReview,{comment: coment},token))
              })
              .catch(() => {
                  swal({
                        title: "No se modificó el comentario",
                        icon: 'error',
                        button: 'Aceptar'
                  });
              });
       }
            
        return (
                <>
                <button className={styles.btn} onClick={()=>modificar()}><MdIcon.MdModeEdit className={styles.modif}/></button> 
               </>
        )         
     
}
