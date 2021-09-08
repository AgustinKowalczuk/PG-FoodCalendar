import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { register } from '../../actions/index'
import { useDispatch } from 'react-redux'

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
        dispatch(Register(value))
    }

    return (
        <Formik 
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            <Form>
                <div>
                    <label>First name</label>
                    <Field type="text" name="name" placeholder='Escribe aqui'/>
                    <ErrorMessage name="name"/>
                </div>
                <div>
                    <label>Last name</label>
                    <Field type="text" name="surname" placeholder='Escribe aqui'/>
                    <ErrorMessage name="surname"/> 
                </div>
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