import React, { useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions';
import { useHistory } from 'react-router';
import style from '../../Styles/StyleAcount.module.css'
import swal from 'sweetalert';

export default function Login() {
    const token = useSelector(state => state.token);
    const user = useSelector(state => state.user);
    const history = useHistory();

    const dispatch = useDispatch()
    const initialValues= {
        email:'',
        password: ''
    }

    const validationSchema = Yup.object({
        email: Yup.string()
            .required('Requerido')
            .email('Formato no valido'),
        password: Yup.string()
            .required('Requerido')
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                "Minimo de 8 caracteres, una mayuscula, una minuscula"
            ),
    })

    useEffect(() => {
        if (token) {
            history.push('/');
            sessionStorage.token = token;
            sessionStorage.user = JSON.stringify(user);
        }
    }, [token]);
    
    const onSubmit = (value) => {
        dispatch(login(value))
        swal({
            title: "Ingresaste a tu cuenta",
            text: "Ingresaste a tu cienta con exito",
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
                            <label className="form-label">Email</label>
                            <Field type="email" name="email" placeholder='Escribe aqui' autocomplete="off"/>
                            <ErrorMessage id="emailHelp" className="form-text" name="email"/> 
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <Field type="password" name="password" placeholder='Escribe aqui' autocomplete="off"/>
                            <ErrorMessage id="emailHelp" className="form-text" name="password"/>
                        </div>
                        <button id={style.btn} className="btn btn-primary" type="submit">Ingresar</button>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}
