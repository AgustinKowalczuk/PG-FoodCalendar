import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getComentaryDetail, deleteReviewsAsAdmin } from "../../../actions";
import styles from "../../../Styles/StyleAllComent.module.css";
import style from '../../../Styles/StyleAcountList.module.css'
import swal from 'sweetalert';


export default function UserDetails () {
    const {id} = useParams()
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const commentDetails = useSelector((state) => state.userCommentsDetails)

    useEffect(() => {
        dispatch(getComentaryDetail(id, token))
    }, [dispatch, id, token])

    function handleClick(id){
        swal({
            title: "¿Estás seguro de eliminar este comentario?",
            text: "¡Una vez eliminado no hay vuelta atrás!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                dispatch(deleteReviewsAsAdmin(id, token))
            } else {
              swal({
                  title: "Comentario no eliminado",
                  icon:'error',
                  button:'Aceptar'
              });
            }
          });
    }
    return (
            <div className={styles.content} key={id}>
                {commentDetails.length < 1 ? (
                    <h3 className={styles.text}>Este usuario no tiene comentarios.</h3>
                ) : ( 
                    <div className={styles.content}>
                    {commentDetails?.map((e)=> {
                            const fecha = new Date(e.date)
                            const mes= fecha.getMonth()+1
                            const dia= fecha.getDate()
                            const anio= fecha.getFullYear()
                            return                 (
                                <ul className={styles.contentData} key={e.id}>
                                    <li className={styles.comment}><p className={styles.text}>{e.comment}</p></li>
                                    <li className={styles.name}>{e.recipe.name}</li>
                                    <label
                                    className={styles.day}
                                    type='date'
                                    >Fecha: {`${dia}/${mes}/${anio}`}
                                    </label>
                                    <div className={style.delete} key={e.id}>
                                    <button className="btn btn-danger" onClick={() => handleClick(e.id)}>X</button>
                                    </div>
                                </ul>
                            )
                            })}
                        </div>)}
            </div>
    );
}