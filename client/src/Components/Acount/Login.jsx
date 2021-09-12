import React, { useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions';
import { useHistory } from 'react-router';

export default function Login() {
    const token = useSelector(state => state.token);
    const user = useSelector(state => state.user);
    const history = useHistory();

    const dispatch = useDispatch();
    const initialValues= {
        email:'',
        password: ''
    };

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
    };

    return (
        <Formik 
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            <Form>                
                <div>
                    <label>Email</label>
                    <Field type="text" name="email" placeholder='Escribe aqui' autocomplete='off'/>
                    <ErrorMessage name="email"/> 
                </div>
                <div>
                    <label>Password</label>
                    <Field type="password" name="password" placeholder='Escribe aqui' autocomplete='off'/>
                    <ErrorMessage name="password"/>
                </div>

                <button type="submit">Login</button>
            </Form>
        </Formik>
    );
}
