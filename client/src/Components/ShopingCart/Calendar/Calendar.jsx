import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCalendar, getCalendarDetail, getCalendarUser } from '../../../actions'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';

export default function Calendar( {admin}) {
    const state = useSelector(state => state.calendary)
    const dispatch = useDispatch();
    const token = useSelector(state => state.token);
    const location = useLocation();

    useEffect(() => {
        if (admin) {
            dispatch(getCalendar(token));
        }
        else {
            dispatch(getCalendarUser(token));
        }      
   }, [dispatch,location])

    return (
        <div>
            <h1>Todos los calendarios</h1>
            {state?.map((e)=>{
                return (
                    <div key={e.id}>
                        <label>Nombre del Calendario</label>
                        <Link to={`/calendar/${e.id}`}>
                            <button onClick={()=>dispatch(getCalendarDetail(e.id,token))}>{e.name}</button>
                        </Link>
                            <div>
                    </div> 
                    </div>
                )
            })}
        </div>
        
    )
}

