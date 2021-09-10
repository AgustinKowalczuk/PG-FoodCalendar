import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import style from '../../../Styles/StyleCardShop.module.css'

export default function Calendar(props) {
    
    const days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']
    return (
        <table className={style.contenedorCalendar}>
            <td className={style.horarios}> 
                <tr><h5>Horarios</h5></tr>
                <tr><p>Almuerzo</p></tr>
                <tr><p>cena</p></tr>
            </td>
            <Droppable droppableId='Table2'>
                {
                    (provided) => (
                        days.map((day, index) => (
                            <td className={style.Calendar} ref={provided.innerRef} {...provided.droppableProps}>
                                <tr><h5>{day}</h5></tr>
                                <Draggable draggableId={index.toString()} index={index}>
                                    {
                                        (provider) => (
                                            <div {...provider.draggableProps} {...provider.draggableProps} ref={provider.innerRef}>
                                                <tr className={style.add}><p>text</p></tr>
                                                <tr className={style.add}><p>text</p></tr>
                                            </div>
                                        )
                                    }
                                </Draggable>
                            </td>
                        ))
                    )
                }
            </Droppable>
        </table>
    )
}
