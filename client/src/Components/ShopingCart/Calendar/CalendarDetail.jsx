import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router';
import { getDetail } from '../../../actions';

export default function CalendarDetail() {
        const dispatch = useDispatch();
        const history = useHistory();
        const calendarDetail = useSelector((state) => state.calendarDetail);
        console.log(calendarDetail);
        let arrDays = new Array(7).fill(0);
        arrDays = arrDays.map((e, i) => e + i + 1);
        const handleClick = (id) => {
                dispatch(getDetail(id));
                history.push(`/recipe/${id}`)
        }
        return (
                <div>
                        <h4>Detalle del calendario:</h4>
                        <h3>{calendarDetail[0]?.name}</h3>
                        <table>
                                <tr>
                                        {arrDays.map(e => <th>{`Día ${e}`}</th>)}
                                </tr>
                                <tr>
                                        {calendarDetail[0]?.calendar?.map((e) => (
                                                <td><button onClick={() => handleClick(e.firstRecipe.id)}>{e.firstRecipe.name}</button></td>
                                        ))}
                                </tr>
                                <tr>
                                        {calendarDetail[0]?.calendar?.map((e) => (
                                                <td><button onClick={() => handleClick(e.secondRecipe.id)}>{e.secondRecipe.name}</button></td>
                                        ))}
                                </tr>
                        </table>
                </div>
        )
}
/* <li>{e.secondRecipe.name}</li> */
