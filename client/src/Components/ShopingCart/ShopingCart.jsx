import React, { useEffect, useState } from "react";
import Recipes from "./Recipes/Recipes";
import { useSelector, useDispatch } from "react-redux";
import { cleanNewCalendar, clearInventary, postcalendar } from "../../actions/index";
import style from "../../Styles/StyleCardShop.module.css";
import { Link } from "react-router-dom";
import '@lourenci/react-kanban/dist/styles.css'
import { useHistory } from "react-router";
import swal from 'sweetalert';

export default function ShopingCart() {

  const dispatch = useDispatch();
  const [text, setText] = useState("")
  const calendar = useSelector(state => state.sendCalendar)
  const token = useSelector(state => state.token)
  const newCalendar = useSelector(state => state.newCalendar)
  const history = useHistory()
  
  console.log(calendar)
  useEffect(() => {
    if (newCalendar) {
      history.push('calendar/user')
      dispatch(cleanNewCalendar())
      dispatch(clearInventary())
    }
  },[dispatch, newCalendar, history])

  const onSubmit = () => {

    dispatch(postcalendar({name:text, calendar: calendar}, token));
  };
  const handeChange = (event) => {
    setText(event.target.value)
  };

  return (
    <div className={style.contenAll}>
      <div className="mb-3" id={style.btn}>
        <label className="form-label">Ingrese un nombre al calendario</label>
        <input className='form-control' id={style.nameCalendar} type="text" onChange={(e) => handeChange(e)} />
      </div>
      <Recipes />
      <div className={style.buttonsContent}>
        <button id={style.btn} className='btn btn-primary' onClick={onSubmit}>Guardar calendario</button>
        <Link id={style.btn} className='btn btn-primary' to="/calendar">Ver mis calendarios</Link>
      </div>
    </div>
  );
}