import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'

export default function Register() {

    const initialValues= {
        name:'',
        surname:'',
        email:'',
        password: ''
    }

    const validate = (value) => {

        let errors = {}

        if(!value.name){
            errors.name = 'Requierido'
        }else if(!/^[a-zA-Z\s]*$/.test(value.name)){
            errors.name = 'No es un texto valido'
        }

        if(!value.surname){
            errors.surname = 'Requierido'
        }else if(!/^[a-zA-Z\s]*$/.test(value.surname)){
            errors.surname = 'No es un texto valido'
        }

        if(!value.email){
            errors.email = 'Requierido'
        }else if(!/^[a-zA-Z\s]*$/.test(value.email)){
            errors.email = 'No es un texto valido'
        }

        if(!value.password){
            errors.password = 'Requierido'
        }else if(!/^(([^<>()[].,;:\s@"]+(.[^<>()[].,;:\s@"]+)*)|(".+"))@(([^<>()[].,;:\s@"]+.)+[^<>()[].,;:\s@"]{2,})$/i.test(value.password)){
            errors.password = 'No es un texto valido'
        }
    }

    const submit = (value) => {
        console.log('Submit value', value)
    }

    return (
        <Formik 
            initialValues={initialValues}
            validate={validate}
            onsubmit={submit}
        >
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
