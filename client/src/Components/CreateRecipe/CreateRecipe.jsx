import React, { useEffect } from "react";
import style from "../../Styles/StyleFrom.module.css";
import { createRecipe, getIngredients } from "../../actions/index"
import { useFormik } from "formik";
import { useDispatch, useSelector } from 'react-redux'


export default function CreateRecipe() {
  
  
  
const dispatch = useDispatch()

const ingre = useSelector((state) => state.ingredients)


  useEffect(() =>{
    dispatch(getIngredients())
  }, [dispatch])

  const initialValues = {
    name: '',
    preparation: '',
    difficulty: 'Easy',
    ingredients: [],
    img: '',
  }

  const validate = (values) => {
    let error = {}

    if (!values.name) {
      error.name = "Required";
    } else if ( !/^[a-zA-Z\s]*$/.test(values.name) ) {
      error.name = "Not String";
    }

    if (!values.preparation) {
      error.preparation = "Required";
    } else if ( !/^[a-zA-Z\s]*$/.test(values.preparation)) {
      error.preparation = "Not String";
    }
    
    if (!values.img) {
      error.img = "Required";
    }
    
    return error;
  }

  const onSubmit =  (values) => {
    dispatch(createRecipe(formik.values))
    console.log('Values submit', values);
  }
  
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate
  })
  
  const onDelete = (event) => {
    formik.values.ingredients = formik.values.ingredients.filter(e => e === event.target.value)
  }

  return (
    <div class={style.centrado}>
          <form class={style.forms} onSubmit={formik.handleSubmit}>
            <div div class="mb-3">
              <label class="form-label">Name</label>
              <input
                onChange={formik.handleChange}
                value={formik.values.name}
                onBlur={formik.handleBlur}
                name="name"
                class="form-control"
                placeholder="write here..."
              />
              {
                formik.errors.name && formik.touched.name === true ? 
                <div class='cosoForm'><span>{formik.errors.name}</span></div> : 
                null
              }
            </div>

            <div class="mb-3">
              <label class="form-label">Ingredients</label>
              <select onChange={formik.handleChange} name={`ingredients[${formik.values.ingredients.length}].ingredient`} id="disabledSelect" class="form-select">
                {
                  ingre?.map(e => {
                    return <option name='ingredients' value={e.name}>{e.name}</option>;
                  })
                }
              </select>
              <div class={style.buttonsRemove}>
                {
                  formik.values.ingredients.length > 0 && formik.values.ingredients.map((e) => {
                    return (
                      <div class={style.grid}>
                        <input class={style.inputGrid} onChange={formik.handleChange} name={e.amount} />
                        <select class={style.selectGrid} onChange={formik.handleChange} name={e.unit} id="disabledSelect" class="form-select">
                          <option name={e.unit}>G</option>
                          <option name={e.unit}>KG</option>
                        </select>
                        <h5 onClick={(x) => onDelete(x)} 
                          value={e.ingredient} class={style.button}>
                            {e.ingredient}
                        </h5>
                      </div>
                    )
                  })
                }
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label">difficulty</label>
              <select onChange={formik.handleChange} name='difficulty' class="form-control">
                <option name='difficulty' value="Easy"> Easy </option>
                <option name='difficulty' value="Medium"> Medium </option>
                <option name='difficulty' value="Hard"> Hard </option>
              </select>
            </div>

            <div class="mb-3">
              <label class="form-label">preparation</label>
              <textarea 
                onChange={formik.handleChange}
                value={formik.values.preparation} 
                onBlur={formik.handleBlur} 
                class="form-control"
                name="preparation"
                type="text"
                placeholder="write here..."
              />
              {
                formik.errors.preparation && formik.touched.preparation === true ? 
                <div class='cosoForm'><span>{formik.errors.preparation}</span></div> : 
                null
              }
            </div>

            <div class="mb-3">
              <label class="form-label">image</label>
              <input 
                onChange={formik.handleChange}
                value={formik.values.img}
                onBlur={formik.handleBlur}
                class="form-control"
                name="img"
                type="text"
                placeholder="write here..."
              />
              {
                formik.errors.img && formik.touched.img === true ? 
                 <div class='cosoForm'><span>{formik.errors.img}</span></div> : null
              }
            </div>
            <div class="col-auto">
              <button type="submit" class="btn btn-primary mb-3">
                Create
              </button>    
            </div>
          </form>
    </div>
  )
}