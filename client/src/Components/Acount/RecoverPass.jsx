import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch,  } from 'react-redux';
import { putRecoveryPass} from '../../actions';

import style from '../../Styles/StyleAcount.module.css'
import swal from 'sweetalert';


export default function RecoverPass() { 

    const dispatch = useDispatch()
    const initialValues= {
        email: ''
    }

    const validationSchema = Yup.object({
        email: Yup.string()
            .required('Requerido')
            .email('Formato no valido'),   
    })
    
    const onSubmit = (e) => {
        dispatch(putRecoveryPass(e.email))
        swal({
            title: "Mail con password nuevo enviado",
            text: "Revise su bandeja de entrada",
            icon: "success",
            button: "Aceptar",
        })
    }

    return (
        <div className={style.container}>

        <Formik 
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            <Form>
                <div className={style.content}>
                    <div className="mb-3">
                        <h1>Ingresa el mail al que estas registrado:</h1>
                        <label className="form-label">Email</label>
                        <Field type="email" id="exampleInputEmail1" name="email" placeholder='ejemplo@jemplo.com' autocomplete="off"/>
                        <ErrorMessage id="emailHelp" className="form-text" name="email"/> 
                    </div>
                    <button id={style.btn} className="btn btn-primary" type="submit">Enviar</button>
                </div>
            </Form>
        </Formik>
        </div>
    )
}
