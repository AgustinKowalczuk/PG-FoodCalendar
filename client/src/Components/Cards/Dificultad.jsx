import React from 'react'
import style from '../../Styles/StyleDificult.module.css'

const colorNone = (event) => {
    if(event){
        return <div class={style.positivo}><p class={style.transparent}>a</p></div>
    }else if(event === false){
        return <div class={style.negativo}><p class={style.transparent}>a</p></div>
    }
}
export default function Dificultad(props) {

    return (
        <div class= {style.grid}>
            {
                props.difficulty === 'Fácil'?
                    colorNone(true):
                    colorNone(false)
            }
            {
                props.difficulty === 'Moderado'?
                    colorNone(true):
                    colorNone(false)
            }
            {
                props.difficulty === 'Difícil'?
                    colorNone(true):
                    colorNone(false)
            }
        </div>
    )
}
