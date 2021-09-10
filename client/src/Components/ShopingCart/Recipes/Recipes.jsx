import React from 'react'
import style from '../../../Styles/StyleCardShop.module.css'
import { Droppable, Draggable } from 'react-beautiful-dnd'

export default function Recipes(props) {
    return (
        <Droppable droppableId='Table1'>
            {
                (provided) => (
                    <div className={style.contentData}  ref={provided.innerRef} {...provided.droppableProps}>
                    {
                        props.calendar?.map( (recetas, index) => (
                            <Draggable draggableId={index} index={index}>
                                {
                                    (provider) => (

                                        <div key={index} {...provider.draggableProps} {...provider.draggableProps} ref={provider.innerRef}>
                                            <h5 className={style.changer}>{recetas.name}</h5>
                                        </div>
                                    )
                                }
                            </Draggable>
                        ))
                    }
                    </div>
                )     
            }    
        </Droppable>
    )
}
