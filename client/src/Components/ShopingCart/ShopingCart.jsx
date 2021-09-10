import React, { useState } from 'react'
import Calendar  from './Calendar/Calendar'
import { useSelector, useDispatch } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import style from '../../Styles/StyleCardShop.module.css'

export default function ShopingCart() {

    const calendar = useSelector((state) => state.recipes)

    return (
        <div className={style.contenAll}>
            <div className={style.contentData}>
                {
                    calendar?.map( (recetas, index) => (
                        <div key={index}>
                            <h5 className={style.changer}>{recetas.name}</h5>
                        </div>
                    ))
                }
            </div>
            <Calendar />
        </div>
    )
}
