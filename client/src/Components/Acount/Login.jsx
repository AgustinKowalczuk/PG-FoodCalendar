import React, { useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { cleanGoogleAuthUrl, getGoogleAuthUrl, login } from '../../actions';
import { useHistory } from 'react-router';
import style from '../../Styles/StyleAcount.module.css'
import swal from 'sweetalert';
import { Link, useParams } from 'react-router-dom';
import * as FcIcons from 'react-icons/fc'

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
            .email('Formato no válido'),
        password: Yup.string()
            .required('Requerido')
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                "Mínimo de 8 caracteres, una mayúscula, una minúscula"
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
        if (Object.keys(params).length === 2) {
            const { token, user } = params;
            sessionStorage.token = token;
            sessionStorage.user = user;
            history.push('/');
            swal({
                title: "Bienvenido!!",
                text: "Has ingresado a la cuenta",
                icon: "success",
                button: "Aceptar",
            })
        } else if (Object.keys(params).length === 1) {
            const { email } = params;
            swal({
                title: "Usuario no registrado",
                text: `El usuario con el email ${email} no se encuentra registrado`,
                icon: "error",
                button: "Aceptar",
            });
            history.push('/acount/login');
           
        }
    }, [params]);

    useEffect(() => {
        if (googleAuthUrl) {
            const anchor = document.getElementById('GoogleAuth');
            anchor.click();            
            dispatch(cleanGoogleAuthUrl());            
        }
    },[googleAuthUrl])
    
    const onSubmit = (value) => {
        dispatch(login(value))
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
                <Form className={style.content}>
                    <div>
                        <div className={style.inputs}>
                            <label className="form-label">Email</label>
                            <Field type="email" name="email"  id="exampleInputEmail1" placeholder='Escribe aquí' autocomplete="off"/>
                            <ErrorMessage id="1-emailHelp" className="form-text" name="email"/> 
                        </div>
                        <div className={style.inputs}>
                            <label className="form-label">Password</label>
                            <Field  id="exampleInputPassword1" type="password" name="password" placeholder='Escribe aquí' autocomplete="off"/>
                            <ErrorMessage id="2-emailHelp" className="form-text" name="password"/>
                        </div>

                        <div className={style.buttons}>
                            <button id={style.btn} type="submit">Ingresar</button>
                            <p> O </p>
                            <button onClick={GoogleChange} id={style.btn}><FcIcons.FcGoogle className={style.icon}/>Iniciar con Google</button>
                                <a href={googleAuthUrl} id={'GoogleAuth'}/>
                        </div>
                        <div>

                            <div>
                            <Link to="/acount/register" >
                                ¿Aún no te registraste? ¡Haz click Aquí!
                            </Link>
                            </div>
                            <div>
                                <Link to="/acount/recovery">
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </div>
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

