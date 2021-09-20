import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import style from "../../Styles/StyleDetail.module.css";


export default function IngredientsPanel() {
    const recipeDetail = useSelector((state) => state.detail);



    return (
        <div className={style.ingredientes}>
              <ul class={style.ul}>
                {
                  recipeDetail.ingredients?.map((x) => (
                    <li className={style.li}>
                      <h5>{x.ingredient} {x.amount} {x.unit}</h5>
                    </li>
                  ))
                }
              </ul>
          </div>
    )
}
