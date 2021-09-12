import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { login } from '../../actions/index'

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
        <Formik 
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            <Form>
                <div>
                    <label>Email</label>
                    <Field type="text" name="email" placeholder='Escribe aqui'/>
                    <ErrorMessage name="email"/> 
                </div>
                <div>
                    <label>Password</label>
                    <Field type="password" name="password" placeholder='Escribe aqui'/>
                    <ErrorMessage name="password"/>
                </div>

                <button type="submit">Registrar</button>
            </Form>
        </Formik>
    )
}
