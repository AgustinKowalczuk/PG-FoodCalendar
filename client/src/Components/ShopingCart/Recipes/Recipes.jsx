import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '@lourenci/react-kanban/dist/styles.css'
import Board, { moveCard } from '@lourenci/react-kanban';
import { sendCalendar, setRecipeCalendar } from '../../../actions/index';
import swal from 'sweetalert';

export default function Recipes() {


    const dispatch = useDispatch()
    const recipes = useSelector((state => state.recipeCalendar))
    const maping = recipes?.map((e, index) => {
        return {
            id: index,
            title: e.name,
            description: e?.category?.length > 2 ? e?.category[0] + ' ' + e?.category[1] : e?.category?.join(' '),
            recipeID: e.id,
        }
    })
    const [daysColumns, setday] = useState(
        {
            columns: [
                {
                    id: 0,
                    title: 'Recetas',
                    cards: maping
                },
                {
                    id: 1,
                    title: 'Lunes',
                    cards: []
                },
                {
                    id: 2,
                    title: 'Martes',
                    cards: []
                },
                {
                    id: 3,
                    title: 'Miércoles',
                    cards: []
                },
                {
                    id: 4,
                    title: 'Jueves',
                    cards: []
                },
                {
                    id: 5,
                    title: 'Viernes',
                    cards: []
                },
                {
                    id: 6,
                    title: 'Sábado',
                    cards: []
                },
                {
                    id: 7,
                    title: 'Domingo',
                    cards: []
                }
            ],
        })

    useEffect(() => {
        if (localStorage.objectCalendar) {
            setday(JSON.parse(localStorage.objectCalendar))

            dispatch(setRecipeCalendar(JSON.parse(localStorage.recipesInventary)))
         }
    }, [])

    const handleCards = (_card, source, destination) => {

        if (destination.toColumnId === 0 || daysColumns.columns[destination.toColumnId].cards.length < 2) {

            const ofMoved = moveCard(daysColumns, source, destination)
            const send = []

            localStorage.objectCalendar = JSON.stringify(ofMoved)
            localStorage.recipesInventary = JSON.stringify(recipes)

            ofMoved.columns.forEach((e) => {
                if (e.id !== 0) {

                    e.cards.forEach((c, index) => {
                        let x = 2 * (e.id - 1) + index
                        send[x] = c.recipeID
                    })
                }
            })
            setday(ofMoved)

            dispatch(sendCalendar(send))
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