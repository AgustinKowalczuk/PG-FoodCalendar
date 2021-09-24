import React, { useEffect } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { cleanGoogleAuthUrl, getGoogleAuthUrl, register } from '../../actions/index'
import { useDispatch, useSelector } from 'react-redux'
import style from '../../Styles/StyleAcount.module.css'
import swal from 'sweetalert';
import { useHistory, useParams } from 'react-router'
import * as FcIcons from 'react-icons/fc'

export default function Register() {
    const params = useParams();
    const history = useHistory();
    const dispatch = useDispatch()
    const initialValues= {
        name:'',
        surname:'',
        email:'',
        password: ''
    }
    const googleAuthUrl = useSelector(state => state.googleAuthUrl);
    const userRegister = useSelector(state => state.userRegister);

    useEffect(() => {
        if (!!Object.keys(userRegister).length) {
            sessionStorage.userRegister = JSON.stringify(userRegister);
            history.push('/checkout');
        }
    },[userRegister]);

    useEffect(() => {
        if (googleAuthUrl) {
            const anchor = document.getElementById('GoogleAuth');
            anchor.click();
            dispatch(cleanGoogleAuthUrl());
        }
    },[googleAuthUrl]);

    useEffect(() => {        
        if (!!Object.keys(params).length) {
            const { email } = params;
            swal({
                title: "Usuario registrado",
                text: `El usuario con el email: ${email} ya se encuentra registrado.`,
                icon: "error",
                button: "Aceptar",
            });
            history.push('/acount/register');
        }
    }, [params])

    const validationSchema = Yup.object({
        name: Yup.string()
            .required('Requerido')
            .min(3, 'Mínimo de 3 letras')
            .matches(/^[a-zA-Z\s]*$/, 'No se aceptan números'),
        surname: Yup.string()
            .required('Requerido')
            .matches(/^[a-zA-Z\s]*$/, 'No se aceptan números'),
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

    const onSubmit = (value) => {
        dispatch(register(value));
    }

    const GoogleChange = () => {
        dispatch(getGoogleAuthUrl('register'));
    }

    return (
        <div className={style.container}>

            <Formik 
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}>
                <Form className={style.content}>
                    <div>

                        <div className="mb-3">
                            <label className="form-label">Nombre</label>
                            <Field type="text" name="name" placeholder='Escribe aquí tu nombre' autocomplete="off"/>
                            <ErrorMessage id="emailHelp-1" className="form-text" name="name"/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Apellido</label>
                            <Field type="text"  name="surname" placeholder='Escribe aquí tu apellido' autocomplete="off"/>
                            <ErrorMessage id="emailHelp-2" className="form-text" name="surname"/> 
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <Field type="email" name="email" placeholder='ejemplo@jemplo.com' autocomplete="off"/>
                            <ErrorMessage id="emailHelp-3" className="form-text" name="email"/> 
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Clave</label>
                            <Field type="password" name="password" placeholder='Escribe aquí tu contraseña' autocomplete="off"/>
                            <ErrorMessage id="emailHelp-4" className="form-text" name="password"/>
                        </div>  
                        <div>
                            <button id={style.btn} type="submit">Registrarse</button>
                            <p>O</p>
                            <button onClick={GoogleChange} id={style.btn}><FcIcons.FcGoogle className={style.icon}/>Registrarse con Google</button>
                            <a href={googleAuthUrl} id={'GoogleAuth'}/>
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}