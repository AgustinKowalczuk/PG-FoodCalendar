import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCalendar, getCalendarDetail, getCalendarUser } from '../../../actions'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import styles from '../../../Styles/StyleCalendars.module.css'

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
        <div className={styles.content}>
            <h1>Todos los calendarios</h1>
            <div className={styles.flex}>

                {state?.map((e)=>{
                    return (
                        <div key={e.id} className={styles.contentData}>
                            <h4>{e.name}</h4>
                            <Link to={`/calendar/${e.id}`}>
                                <button className="btn btn-primary mb-3" id={styles.btn} onClick={()=>dispatch(getCalendarDetail(e.id,token))}>Ver Calendario</button>
                            </Link>
                                <div>
                        </div> 
                        </div>
                    )
                })}
            </div>
        </div>
        
    )
}

