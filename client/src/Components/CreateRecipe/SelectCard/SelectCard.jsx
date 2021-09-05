import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getUnit } from '../../../actions/index'
import style from '../../../Styles/StyleFrom.module.css'

export default function SelectCard(props) {
    const dispatch = useDispatch()

    const unit = useSelector((state) => state.unit);
    useEffect(()=> {
       dispatch(getUnit()); 
    },[dispatch])
    
    const selectUnit = (id) => {
        console.log(id)
        return (
          <select
            defaultValue="gr"
            class={style.selectGrid}
            onChange={props.handleChange}
            name={id}
            id="disabledSelect"
            class="form-select"
          >
            {unit?.map((e) => {
              return<option name={id}>{e.name}</option>;
            })}
          </select>
        );
      }
    //   const onDelete = (event) => {
    //     formik.values.ingredients = formik.values.ingredients.filter(
    //       (e) => e.ingredient === event.target.value
    //     );
    //   };
    return (
        <div class={style.grid}>
        <input
            type="number"
            class={style.inputGrid}
            onChange={props.handleChange}
            name={`${props.name}.amount`}
        />
        {
            selectUnit(`${props.name}.unit`)
        }
        <h5
            // onClick={(x) => onDelete(x)}
            value={props.ingredient}
            class={style.button}
        >
            {props.ingredient}
        </h5>
        </div>
    )
}
