import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router';
import { getDetail } from '../../../actions';
import styles from '../../../Styles/StyleCalendarList.module.css'

export default function CalendarDetail() {
        const dispatch = useDispatch();
        const history = useHistory();
        const calendarDetail = useSelector((state) => state.calendarDetail);
        const token = useSelector(state => state.token);
        let arrDays = new Array(7).fill(0);
        arrDays = arrDays.map((e, i) => e + i + 1);
        const handleClick = (id) => {
                dispatch(getDetail(id,token));
                history.push(`/recipe/${id}`)
        }

        return (
                <div className={styles.container}>
                <h2 className={styles.text}>Detalle del calendario:</h2>
                        <h3>{calendarDetail[0]?.name}</h3>
                        <table className={styles.table}>
                        {arrDays.map((e, index) => (
                                <td className={styles.row} id={styles.column} key={`${index}-0`}>
                                        <th>{`Día ${e}`}</th>
                                        <td className={styles.row}>
                                                <button id={styles.btn} className="btn btn-primary mb-3" onClick={() => handleClick(calendarDetail[0]?.calendar[index].firstRecipe.id)}>{calendarDetail[0]?.calendar[index].firstRecipe.name}</button>
                                                <button id={styles.btn} className="btn btn-primary mb-3" onClick={() => handleClick(calendarDetail[0]?.calendar[index].secondRecipe.id)}>{calendarDetail[0]?.calendar[index].secondRecipe.name}</button>
                                        </td>
                                </td>
                        )
                        
                        )}
                                
                                
                        </table>
                </div>
        )
}
