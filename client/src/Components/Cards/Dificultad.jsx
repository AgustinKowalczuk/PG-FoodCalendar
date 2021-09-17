import React from 'react'
import style from '../../Styles/StyleDificult.module.css'

const colorNone = (event) => {
    if(event === 'Fácil'){
        return <div className={style.grid}>
                <div className={style.positivo}><p className={style.transparent}>a</p></div>
                <div className={style.negativo}><p className={style.transparent}>a</p></div>
                <div className={style.negativo}><p className={style.transparent}>a</p></div>
            </div>
    }else if(event === 'Moderado'){
        return <div className={style.grid}>
        <div className={style.positivo}><p className={style.transparent}>a</p></div>
        <div className={style.positivo}><p className={style.transparent}>a</p></div>
        <div className={style.negativo}><p className={style.transparent}>a</p></div>
    </div>
    }else if(event === 'Difícil'){
        return <div className={style.grid}>
        <div className={style.positivo}><p className={style.transparent}>a</p></div>
        <div className={style.positivo}><p className={style.transparent}>a</p></div>
        <div className={style.positivo}><p className={style.transparent}>a</p></div>
    </div>
    }
}


export default function Dificultad(props) {

    return colorNone(props.difficulty)
           
    
}
