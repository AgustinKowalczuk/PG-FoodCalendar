import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getUnit, setFormIngredients } from '../../../actions/index'
import style from '../../../Styles/StyleFrom.module.css'

export default function SelectCard(props) {
    const dispatch = useDispatch()

    const unit = useSelector((state) => state.unit);
    
   if(unit[0]?.name!==' '){
      unit.unshift({name:' '})
    }  
           
    useEffect(()=> {
      dispatch(getUnit()); 
      },[]) 

    const selectUnit = (id) => {
        return (
          <select
            defaultValue= {props.unit}
            class={style.selectGrid}
            onChange={props.handleChange}
            name={id}
            required
            id="disabledSelect"
            class="form-select"
          >
            {unit?.map((e) => {
              return<option  name={id}>{e.name}</option>;
            })}
          </select>
        );
      }
      const onDelete = (event) => {
        const deleter = props.formik.values.ingredients.filter(
          (e) => e.ingredient !== event.target.innerHTML
        );
        dispatch(setFormIngredients(deleter))
        props.onChange(deleter)
      };
    return (
        <div class={style.grid}>
        <input
            type="number"
            class={style.inputGrid}
            onChange={props.handleChange}
            name={`${props.name}.amount`}
            defaultValue= {props.amount}
        />
        {
            selectUnit(`${props.name}.unit`)
        }
        <h5
            onClick={(x) => onDelete(x)}
            value={props.ingredient}
            class={style.button}
        >
            {props.ingredient}
        </h5>
        </div>
    )
}
