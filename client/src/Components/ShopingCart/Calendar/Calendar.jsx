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
                
            {days.map((day, index) => (
                <td className={style.Calendar}>
                    <tr><h5>{day}</h5></tr>
                    <Draggable draggableId={`12${index.toString()}`} index={index}>
                        {
                            (provider) => (
                                <tr  {...provider.draggableProps} {...provider.dragHandleProps} ref={provider.innerRef} className={style.add}></tr>
                                
                            )
                        }
                    </Draggable>
                    <Draggable draggableId={`14${index.toString()}`} index={index}>
                        {
                            (provider) =>(
                                <tr {...provider.draggableProps} {...provider.dragHandleProps} ref={provider.innerRef} className={style.add}></tr>
                            )
                        }
                    </Draggable>
                </td>
            ))}
        </table>
    )
}

