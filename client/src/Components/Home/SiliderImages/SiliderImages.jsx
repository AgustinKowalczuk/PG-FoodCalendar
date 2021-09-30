import React from 'react'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import Style from '../../../Styles/StyleSlideImg.module.css'

export default function SiliderImages() {

    const imgHome = [
        { img: "https://www.recetasderechupete.com/wp-content/uploads/2015/05/Menu_semanal.jpg", txt: "Organiza tus comidas en un calendario semanal" },
        { img: "https://es.justexw.com/wp-content/uploads/sites/2/planificador-de-dietas-con-excel.jpg", txt: "Usa nuestra página desde el smartphone o tablet para más comodidad" },
        { img: "https://www.cubanos.guru/wp-content/uploads/2018/01/Collage-comidas-legendarias.jpg", txt: "Regístrate para acceder a recetas Premium" }
    ]

    return (
        <div className={Style.container}>
            <Slide arrows={null} easing="ease">
                {
                    imgHome.map((e, index) => {
                        return (
                            <div key={index} className={Style.sliders}>
                                <img className={Style.imgs} src={e.img} alt={`img${index}`} />
                                <div className={Style.textSombreado}>
                                    <p id={Style.fruta}>a</p>
                                </div>
                                <div className={Style.textCont}>
                                    <h4 className={Style.txt}>{e.txt}</h4>
                                </div>
                            </div>
                        )
                    })
                }
            </Slide >
        </div>
    )
}
