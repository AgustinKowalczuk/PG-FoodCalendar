import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import style from '../../../Styles/StyleCardShop.module.css'
import '@lourenci/react-kanban/dist/styles.css'
import Board, { moveCard } from '@lourenci/react-kanban'
import { sendCalendar } from '../../../actions/index'

export default function Recipes() {

    const dispatch = useDispatch()
    const recipes = useSelector((state => state.recipeCalendar))
    const maping = recipes?.map((e,index) => {
        return {
            id: e.id,
            title: e.name,
            description: e.category[0]+ ' ' + e.category[1],

        }
    })
    const [daysColumns, setday] = useState(
        {
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
        const send = []
        ofMoved.columns.forEach((e, index) => {
            if(e.id !== 0 ){
                
                e.cards.forEach(c => {
                    send.push(c.id)
                })
            }
        })
        setday(ofMoved)

        dispatch(sendCalendar(send))
        
    }
    return(
        <Board onCardDragEnd={handleCards} disableColumnDrag>
            {daysColumns}
        </Board>
    )
}