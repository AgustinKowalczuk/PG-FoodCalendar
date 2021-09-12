import React, { useEffect } from 'react'
import { useDispatch } from "react-redux"
import { setFormCategory } from '../../../actions/index'
import style from '../../../Styles/StyleFrom.module.css'

export default function SelectCategory(props) {
        const dispatch = useDispatch()
                                  
          
           const onDelete = (event) => {
              const deleter = props.formik.values.category.filter(
              (e) => e !== event.target.innerHTML);
         dispatch(setFormCategory(deleter))
            props.onChange(deleter)
          };
        return (
            <div class={style.grid}>
            <h5
                onClick={(x) => onDelete(x)}
                value={props.category}
                class={style.button}
             >
                {props.category}
            </h5>
            </div>
        )
    }
    