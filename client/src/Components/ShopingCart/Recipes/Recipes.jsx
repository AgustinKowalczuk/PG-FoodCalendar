import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import style from '../../../Styles/StyleCardShop.module.css'
import '@lourenci/react-kanban/dist/styles.css'
import Board, { moveCard } from '@lourenci/react-kanban'

export default function Recipes() {

    const recipes = useSelector((state => state.recipeCalendar))
    console.log(recipes)
    const maping = recipes?.map((e,index) => {
        console.log(e)
        return {
            id: index,
            title: e.name,
            description: e.category[0]+ ' ' + e.category[1]
        }
    })
    const [daysColumns, setday] = useState({
        columns:[
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
                title: 'Miercoles',
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
                title: 'Sabado',
                cards: []
            },
            {
                id: 7,
                title: 'Domingo',
                cards: []
            }
        ],
    })

    const handleCards = (_card, source, destination) => {
        const ofMoved = moveCard(daysColumns, source, destination)

        setday(ofMoved)
    }
    return(
        <Board onCardDragEnd={handleCards} disableColumnDrag>
            {daysColumns}
        </Board>
    )
}