import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { register } from '../../actions/index'
import { useDispatch } from 'react-redux'
import style from '../../Styles/StyleAcount.module.css'
import swal from 'sweetalert';

export default function Register() {

    const dispatch = useDispatch()
    const initialValues= {
        name:'',
        surname:'',
        email:'',
        password: ''
    }

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

    return (
        <div className={style.container}>

            <Formik 
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}>
                <Form>
                    <div className={style.content}>

                        <div className="mb-3">
                            <label className="form-label">First name</label>
                            <Field type="text" className="form-control" id="exampleInputEmail1" name="name" placeholder='Escribe aqui' autocomplete="off"/>
                            <ErrorMessage id="emailHelp" className="form-text" name="name"/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Last name</label>
                            <Field type="text" className="form-control" id="exampleInputEmail1" name="surname" placeholder='Escribe aqui' autocomplete="off"/>
                            <ErrorMessage id="emailHelp" className="form-text" name="surname"/> 
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <Field type="email" className="form-control" id="exampleInputEmail1" name="email" placeholder='Escribe aqui' autocomplete="off"/>
                            <ErrorMessage id="emailHelp" className="form-text" name="email"/> 
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <Field type="password" className="form-control" id="exampleInputEmail1" name="password" placeholder='Escribe aqui' autocomplete="off"/>
                            <ErrorMessage id="emailHelp" className="form-text" name="password"/>
                        </div>

                        <button type="submit">Registrar</button>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}