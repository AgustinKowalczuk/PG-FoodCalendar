import React, { useState } from 'react'
import Calendar  from './Calendar/Calendar'
import Recipes from './Recipes/Recipes'
import { useSelector, useDispatch } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import style from '../../Styles/StyleCardShop.module.css'

export default function ShopingCart() {

    const calendar = useSelector((state) => state.recipes)
    const [recipe, setRecipe] = useState([])

    return (
        <div className={style.contenAll}>
            <DragDropContext onDragEnd={ () => {}}>
                <Recipes calendar={calendar}/>
                <Calendar recipe={recipe}/>
            </DragDropContext>
        </div>
    )
}
