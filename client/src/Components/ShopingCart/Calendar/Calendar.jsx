import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import style from '../../../Styles/StyleCardShop.module.css'

export default function Calendar(props) {
    
    return (
        <table className={style.contenedorCalendar}>
            <td className={style.horarios}> 
                <tr><h5>Horarios</h5></tr>
                <tr><p>Almuerzo</p></tr>
                <tr><p>cena</p></tr>
            </td>
                
        </table>
    )
}

