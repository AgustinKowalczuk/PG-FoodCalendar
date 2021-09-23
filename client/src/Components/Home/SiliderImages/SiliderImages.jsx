import React from 'react'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import Style from '../../../Styles/StyleSlideImg.module.css'

export default function SiliderImages() {

    const imgHome = [
        { img: "https://www.recetasderechupete.com/wp-content/uploads/2015/05/Menu_semanal.jpg", txt: "Organiza tus comidas en un calendario semanal" },
        { img: "https://es.justexw.com/wp-content/uploads/sites/2/planificador-de-dietas-con-excel.jpg", txt: "Usa nuestra pagina desde el smartphone o tablet para mas comodidad" },
        { img: "https://www.cubanos.guru/wp-content/uploads/2018/01/Collage-comidas-legendarias.jpg", txt: "Registrate para acceder a recetas Premium" },
        { img: "https://lh3.googleusercontent.com/proxy/ipb-kkaL3gMMjxiFqsw06UDvF-emrk29EVIzCRKBzOl_LQ3GGi089-W0BhoezMQ0WN3IeLFePPzcm3x5yNKtwX5Jzhyk9szFkSea8c70kKqH59pAOcSrMwtNsKvg7tTvaSVE", txt: "Obtén una lista con todos los ingredientes necesarios para la semana" }
    ]

    return (
        <div className={Style.container}>
            <Slide arrows={null} easing="ease">
                {
                    imgHome.map((e, index) => {
                        return (
                            <div key={index} className={Style.sliders}>
                                <img className={Style.imgs} src={e.img} />
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
