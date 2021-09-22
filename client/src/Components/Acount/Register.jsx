import React, { useEffect } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { cleanGoogleAuthUrl, getGoogleAuthUrl, register } from '../../actions/index'
import { useDispatch, useSelector } from 'react-redux'
import style from '../../Styles/StyleAcount.module.css'
import swal from 'sweetalert';
import { useHistory, useParams } from 'react-router'

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
                title: "Usuario ya registrado",
                text: `El usuario con el email ${email} ya se encuentra registrado.`,
                icon: "error",
                button: "Aceptar",
            });
            history.push('/acount/register');
        }
    }, [params])

    const validationSchema = Yup.object({
        name: Yup.string()
            .required('Requerido')
            .min(3, 'Minimo de 3 letras')
            .matches(/^[a-zA-Z\s]*$/, 'No se aceptan numeors'),
        surname: Yup.string()
            .required('Requerido')
            .matches(/^[a-zA-Z\s]*$/, 'No se aceptan numeors'),
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

    const onSubmit = (value) => {
        console.log('Submit value', value)
        dispatch(register(value))
        swal({
            title: "Cuenta Registrada",
            text: "Te registraste con exito",
            icon: "success",
            button: "Aceptar",
        })
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
                <Form>
                    <div className={style.content}>

                        <div className="mb-3">
                            <label className="form-label">Nombre</label>
                            <Field type="text" name="name" placeholder='Escriba aqui su nombre' autocomplete="off"/>
                            <ErrorMessage id="emailHelp" className="form-text" name="name"/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Apellido</label>
                            <Field type="text"  name="surname" placeholder='Escriba aqui su calendario' autocomplete="off"/>
                            <ErrorMessage id="emailHelp" className="form-text" name="surname"/> 
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <Field type="email" name="email" placeholder='ejemplo@jemplo.com' autocomplete="off"/>
                            <ErrorMessage id="emailHelp" className="form-text" name="email"/> 
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Clave</label>
                            <Field type="password" name="password" placeholder='Escribe aqui su contraseña' autocomplete="off"/>
                            <ErrorMessage id="emailHelp" className="form-text" name="password"/>
                        </div>  
                        <button id={style.btn} className="btn btn-primary" type="submit">Registrarse</button>
                    </div>
                </Form>
            </Formik>
            <div>
                <button onClick={GoogleChange}>Regístrate con tu cuenta de Google</button>
                <a href={googleAuthUrl} id={'GoogleAuth'}/>
            </div>
        </div>
    )
}