import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '@lourenci/react-kanban/dist/styles.css'
import Board, { moveCard } from '@lourenci/react-kanban';
import { sendCalendar, setDays, setRecipeCalendar } from '../../../actions/index';
import swal from 'sweetalert';

export default function Recipes() {


    const dispatch = useDispatch()
    const daysColumns = useSelector(state => state.daysColumns);

    const handleCards = (_card, source, destination) => {

        if (destination.toColumnId === 0 || daysColumns.columns[destination.toColumnId].cards.length < 2) {

            const ofMoved = moveCard(daysColumns, source, destination);
            const send = [];

            localStorage.objectCalendar = JSON.stringify(ofMoved);

            const inventary = [];
            ofMoved.columns.forEach(e => {
                e.cards.forEach(e => {
                    inventary.push({...e})
                })
            });
            localStorage.recipesInventary = JSON.stringify(inventary);

            ofMoved.columns.forEach((e) => {
                if (e.id !== 0) {
                    
                    e.cards.forEach((c, index) => {
                        let x = 2 * (e.id - 1) + index
                        send[x] = c.recipeID
                    })
                }
            })
            dispatch(setRecipeCalendar(inventary));
            dispatch(setDays(ofMoved));
            dispatch(sendCalendar(send));
        } else {
            return swal({
                title: 'Receta no agregada',
                text: 'Sólo se pueden tener 2 recetas por día',
                icon: 'error',
            })
        }
    }

    return (
        <Board onCardDragEnd={handleCards} disableColumnDrag>
            {daysColumns}
        </Board>
    )
}