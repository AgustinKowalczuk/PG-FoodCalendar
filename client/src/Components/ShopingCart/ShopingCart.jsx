import React, { useState } from 'react'
import Calendar  from './Calendar/Calendar'
import Recipes from './Recipes/Recipes'
import { useSelector, useDispatch } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import style from '../../Styles/StyleCardShop.module.css'

export default function ShopingCart() {

    const recipes = useSelector((state) => state.recipes)

    const [reOrder, setReOrder] = useState([...recipes,[]])

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;
        const items = [...reOrder];

        if(result.source.droppableId !== result.destination.droppableId){
            items[items.length] = [items[result.destination.index]]

        }else{
            const [reorderedItem] = items.splice(result.source.index, 1);
            items.splice(result.destination.index, 0, reorderedItem);

            setReOrder(items);
        }
    
        console.log(reOrder);
    }

    return (
        <div className={style.contenAll}>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Recipes reOrder={reOrder}/>
                <Droppable droppableId='Tier1'> 
                    {
                        (provider) => (
                            <div {...provider.droppableProps} ref={provider.innerRef}>
                                <h1>Test</h1>
                                <Draggable draggableId='secont' index={0}>
                                    {
                                        (provider) => (
                                            <div {...provider.draggableProps} {...provider.dragHandleProps} ref={provider.innerRef}>
                                                <h5>{reOrder[reOrder.length]}</h5>
                                            </div>
                                        )
                                    }
                                </Draggable>
                                {provider.placeholder}
                            </div>
                        )
                    }
                </Droppable>
            </DragDropContext>
        </div>
    )
}
