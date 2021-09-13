import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { login } from '../../actions/index'
import style from '../../Styles/StyleAcount.module.css'

export default function Login() {

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

    const onSubmit = (value) => {
        console.log('Submit value', value)
        dispatch(login(value))
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
                            <Field type="email" name="email" className="form-control" id="exampleInputEmail1" placeholder='Escribe aqui'/>
                            <ErrorMessage id="emailHelp" className="form-text" name="email"/> 
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <Field className="form-control" id="exampleInputPassword1" type="password" name="password" placeholder='Escribe aqui'/>
                            <ErrorMessage id="emailHelp" className="form-text" name="password"/>
                        </div>

                        <button id="emailHelp" className="btn btn-primary" type="submit">Registrar</button>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}
