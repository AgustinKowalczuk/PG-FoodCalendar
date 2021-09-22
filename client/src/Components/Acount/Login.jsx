import React, { useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { cleanGoogleAuthUrl, getGoogleAuthUrl, login } from '../../actions';
import { useHistory } from 'react-router';
import style from '../../Styles/StyleAcount.module.css'
import swal from 'sweetalert';
import { Link, useParams } from 'react-router-dom';

export default function Login() {
    const token = useSelector(state => state.token);
    const user = useSelector(state => state.user);
    const history = useHistory();
    const googleAuthUrl = useSelector(state => state.googleAuthUrl);
    const params = useParams();
    const dispatch = useDispatch();
    
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
            sessionStorage.token = token;
            sessionStorage.user = JSON.stringify(user);
            history.push('/');
        }
    }, [token]);

    useEffect(() => {        
        if (!!Object.keys(params).length) {
            const { token, user } = params;
            sessionStorage.token = token;
            sessionStorage.user = user;
            history.push('/');
        }
    }, [params])

    useEffect(() => {
        if (googleAuthUrl) {
            const anchor = document.getElementById('GoogleAuth');
            anchor.click();            
            dispatch(cleanGoogleAuthUrl());            
        }
    },[googleAuthUrl])
    
    const onSubmit = (value) => {
        dispatch(login(value))
        swal({
            title: "Ingresaste a tu cuenta",
            text: "Ingresaste a tu cuenta con exito",
            icon: "success",
            button: "Aceptar",
        })
    }

    const GoogleChange = () => {
        dispatch(getGoogleAuthUrl('auth'));
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
                            <Field type="email" name="email" className="form-control" id="exampleInputEmail1" placeholder='Escribe aqui' autocomplete="off"/>
                            <ErrorMessage id="emailHelp" className="form-text" name="email"/> 
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <Field className="form-control" id="exampleInputPassword1" type="password" name="password" placeholder='Escribe aqui' autocomplete="off"/>
                            <ErrorMessage id="emailHelp" className="form-text" name="password"/>
                        </div>
                        <button id={style.btn} className="btn btn-primary" type="submit">Ingresar</button>
                    </div>
                </Form>
            </Formik>
            <div>
                <button onClick={GoogleChange}>Ingresa con tu cuenta de Google</button>
                <a href={googleAuthUrl} id={'GoogleAuth'}/>
            </div>
            <div>
            <Link to="/acount/register" >
                ¿Aún no te registraste? Haz click Aqui
            </Link>
            </div>
            <div>
                <Link to="/acount/recovery">
                    Olvidaste tu contraseña?
                </Link>
            </div>
        </div>
    )
}

