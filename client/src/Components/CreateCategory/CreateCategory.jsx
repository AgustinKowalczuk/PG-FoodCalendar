import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector} from "react-redux";
import { createCategory } from "../../actions";
import style from "../../Styles/StyleFrom.module.css"

export default function CreateCategory(props) {
    const dispatch = useDispatch();
    const initialValues = {}
    const token = useSelector(state => state.token);
    
    useEffect(() => {
       formik.values.name=''
    }, [props.toggleCat])
    
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
        dispatch(createCategory(formik.values,token))
        alert('Tu categoría ha sido creada!')
        console.log(e)
    }
    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    })
    return ( 
        <div className={style.centrado} id={style.content}>
            <form className={style.forms} onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Deseas crear una categoría nueva?</label><br />
                    <input
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values?.name}
                    onBlur={formik.handleBlur}
                    name="name"
                    placeholder="Agrega tu categoría"
                    />
                    {formik.errors.name && formik.touched.name === true ? (
                    <div>
                    <span>{formik.errors.name}</span>
                    </div>
                    ) : null}

                    <button className="btn btn-primary mb-3"
                    id={style.btnCreate}
                    type='submit'
                    disabled={props.category?.some(e => e.name?.toLowerCase() === formik.values?.name?.toLowerCase())}
                    >Agregar</button>
                </div>
           </form>
        </div>
     );
}