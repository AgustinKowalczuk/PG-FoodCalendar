import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { postComentario } from '../../actions';
import style from '../../Styles/StyleSendComent.module.css'
import * as IoIcons from "react-icons/io5";
import swal from 'sweetalert';

export default function Reviews({ id }) {

        const token = useSelector(state => state.token)
        const dispatch = useDispatch()

        function handleSubmit() {
                
                swal({
                        title: 'Escribe tu comentario',
                        content: "input",
                        button: 'Enviar'
                })
                .then( coment => {

                        dispatch(postComentario({comment: coment}, id, token))
                })
        }



        return (
                <div className={style.form}>
                        
                        <button className={style.btn} onClick={handleSubmit} type='submit'><IoIcons.IoSend className={style.icon} /> Comentar</button>
                </div>
        )
}
