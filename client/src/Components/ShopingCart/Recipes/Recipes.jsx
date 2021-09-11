import React from 'react'
import style from '../../../Styles/StyleCardShop.module.css'
import { Droppable, Draggable } from 'react-beautiful-dnd'

export default function Recipes(props) {

    
    return(
        <Droppable droppableId='recipes'>
                    {
                        (provider) => (
                            <div className={style.contentData} {...provider.droppableProps} ref={provider.innerRef}>
                                {
                                    props.reOrder?.map( (e, index) => (
                                        <Draggable key={e.id} draggableId={e.id} index={index}>
                                            {
                                                (provided) => (
                                                    <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                        <h5 className={style.changer}>{e.name}</h5>
                                                    </div>
                                                )
                                            }
                                        </Draggable>
                                        
                                    ))
                                }
                                {provider.placeholder}
                            </div>
                        )
                    }
                </Droppable>
    )
}