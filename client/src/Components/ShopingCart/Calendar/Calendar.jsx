import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCalendar, getCalendarDetail } from '../../../actions'
import { Link } from 'react-router-dom';
import CalendarDetail from './CalendarDetail';


export default function Calendar() {
    const state = useSelector(state => state.calendary)
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(getCalendar())
   }, [dispatch])

    return (
        <div>
            <h1>Todos los calendarios</h1>
            {state?.map((e)=>{
                return (
                    <div key={e.id}>
                        <label>Nombre del Calendario</label>
                        <Link to={`/calendar/${e.id}`}>
                            <button onClick={()=>dispatch(getCalendarDetail(e.id))}>{e.name}</button>
                        </Link>
                            <div>
                    </div> 
                    </div>
                )
            })}
        </div>
        
    )
}

