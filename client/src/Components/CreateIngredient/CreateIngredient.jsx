import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch} from "react-redux";
import { createIngredient} from "../../actions";

export default function CreateIngredient(props) {
    const dispatch = useDispatch();
    const initialValues = {}

    useEffect(() => {
       formik.values.name=''
    }, [props.toggle])
    
    const validate = (values) => {
        let error = {}
        if(!values.name){
            error.name = "Se requiere nombre"
        } else if(!/^[^{}<>#$%&~^`/*+¿?¡!@]*$/g.test(values.name)){
            error.name = "No es texto"
        }
        return error
    }
    const onSubmit = (e) => {
        dispatch(createIngredient(formik.values))
        alert('Tu ingrediente ha sido creado!')
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
                    disabled={props.ingre?.some(e => e.name?.toLowerCase() === formik.values?.name?.toLowerCase())}>Agregar</button>
                </div>
           </form>
        </div>
     );
}