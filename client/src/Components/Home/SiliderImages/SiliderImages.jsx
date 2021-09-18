import React from 'react'
import { Slide  } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import Style from '../../../Styles/StyleSlideImg.module.css'

export default function SiliderImages(props) {
 
    
    return (
        <div className={Style.container}>
           <Slide arrows={null} easing="ease">
                {
                    props.allRecipes.map((e, index) => {
                        return (
                            <div key={index} className={Style.sliders}>
                                <img className={Style.imgs} src={e.img}/> 
                            </div>
                        )
                    })
                }
           </Slide >
        </div>
    )
}
