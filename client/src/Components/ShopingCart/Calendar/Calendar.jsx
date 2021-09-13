import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCalendar, getCalendarDetail } from '../../../actions'
import { Link } from 'react-router-dom'
import style from '../../../Styles/StyleCalendarSave.module.css'

export default function Calendar(props) {
    const state = useSelector(state => state.calendary)
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(getCalendar())
   }, [dispatch])

   console.log(state)

    return (
        <div className={style.content}>
            <h1>Todos los calendarios</h1>
            {state?.map((e)=>{
                return (
                    <div>
                        <div className={style.calendarName}>
                            <label>Nombre del Calendario</label>
                            <h3>{e.name}</h3>
                            <Link to={`/calendar/${e.id}`}
                            onclick={()=>dispatch(getCalendarDetail(e.id))}>
                                Ver Calendario</Link>
                            {e.calendar?.map(x =>
                            <h6>{x.firstRecipe.name}</h6>
                            )}
                        </div> 
                    </div>
                )
            })}
        </div>
        
    )
}

