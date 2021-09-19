import React from 'react'
import style from '../../Styles/StyleDificult.module.css'


export default function Dificultad(props) {

    
    return (
       <div className={style.grid}>
           {
               props.difficulty === 'Fácil' && <>
               <div className={style.positivo}><p className={style.transparent}>a</p></div>
               <div className={style.negativo}><p className={style.transparent}>a</p></div>
               <div className={style.negativo}><p className={style.transparent}>a</p></div>
                </>
           }
           {
               props.difficulty === 'Moderado' && <>
               <div className={style.positivo}><p className={style.transparent}>a</p></div>
               <div className={style.positivo}><p className={style.transparent}>a</p></div>
               <div className={style.negativo}><p className={style.transparent}>a</p></div>
                </>
           }
           {
               props.difficulty === 'Difícil' && <>
               <div className={style.positivo}><p className={style.transparent}>a</p></div>
               <div className={style.positivo}><p className={style.transparent}>a</p></div>
               <div className={style.positivo}><p className={style.transparent}>a</p></div>
                </>
           }
           
       </div>
     )
}
