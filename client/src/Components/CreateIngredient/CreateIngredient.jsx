import React, { useEffect } from "react";
//import {Link} from 'react-router-dom';
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createIngredient, getIngredients } from "../../actions";

export default function CreateIngredient() {
    const dispatch = useDispatch();
    const ingre = useSelector((state) => state.ingredients)
    useEffect(() => {
        dispatch(getIngredients())
        console.log(ingre)
    }, [])

    const initialValues = {}

    const validate = (values) => {
        let error = {}
        if(!values.name){
            error.name = "Se requiere nombre"
        } else if(!/^[a-zA-Z\s]*$/.test(values.name)){
            error.name = "No es texto"
        }
        return error
    }
    const onSubmit = (e) => {
        dispatch(createIngredient(formik.values))
        alert('Tu ingrediente ha sido creado!')
        console.log(e)
    }
    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    })
    return ( 
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label>Deseas crear un ingrediente nuevo?</label><br />
                    <input
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values?.name}
                    onBlur={formik.handleBlur}
                    name="name"
                    placeholder="Agrega tu ingrediente"
                    />
                    {formik.errors.name && formik.touched.name === true ? (
                    <div>
                    <span>{formik.errors.name}</span>
                    </div>
                    ) : null}

                    <button
                    type='submit'
                    disabled={ingre?.some(e => e.name?.toLowerCase() === formik.values?.name?.toLowerCase())}>Agregar</button>
                </div>
           </form>
        </div>
     );
}