import React from 'react'


export default function Checkout() {
        return (
        <div className="container">
                <h3 className= "displayh4">Plan Tu Calendario</h3> 
                <div className="row">
                        <div className="col-md-6 offset-3">
                                <div className="card">
                                <div className="card-header">
                                        <h4>Plan Basico</h4></div>
                                </div>
                                <div className="card-body">
                                        <img src="https://lh3.googleusercontent.com/LPm7wx3YKs_z1L8u2OYhfDBd2PmXMXPp_MereibxGQgCEeYRkOIvZegBipYHMsaQ6S-HVFr4QLipfsIE2JS-GoB12MsMQXo2NnaBbf7IufdV0HuE-XOBnWW4HpJGaeV1w876jFS-BisJ21r8Mmli8Gm8UMlHGQKacs5Vf_JsIEkoPP9b9GUwcFl5PT7ySDV9drzXvutzNSvxtmYBFE-VO7t4fPQdRuGmPEYiMr7SBfaiojjJHbnesnNmkmfle2smnTMkhDO8v-35Tfae4-Sce6RET_yzndhPz7xaoWOfsVOb-eBYqF4SKmNIDpr1ALMlogTsuocI8QfU_pQ4ONOX7G0pIaOvhjLBeH6Anb7er-QqWSS-8NfyvegKwn-ZDplam4NvX5lJo4DGrroKFJFO4CV3NUXhGabvHiFCcnXOpk_ESq2HOOoDwd7YP_qGlbERQJEyC0RYpGRn7NO5a3726sclEEo9Q8CHvgv7A_SJ317H4uZE2kxHNf1FqSl98zwz27KoyJXShbu7zynQMxgWmJMC16J8pQuywAp45M-OGb2YJ414JAmEwklY-5XJSFrwHgMohDBt9SN3_dUAVkRFq44Jbe3ZkkPiyGwjTZTXGDmxFmDkQkoPOvelXtJZaR9DZBQm0ndUx4WFVv6UVNvLgM7ASgvMQvOQCPtHp0L_oEzDyJz8fP5tSD1TvD4305WNoLnArmPN6W2rBsX5g8_627R2BQ=w1019-h497-no?authuser=0" alt="Foto"/>
                                        <hr />
                                        <h4>Descripción</h4>
                                        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, cumque.</p>
                                        <hr />
                                        <h4>Precio $500 por mes</h4>
                                        <div>
                                                <form action="http://localhost:3001/checkout" method="POST">
                                                        <input type="hidden" name= "title" value="Recipe Calendar"/>
                                                        <input type="hidden" name="price" value="2500"/>
                                                        <input type="submit" value="Suscribirse" className="btn btn-primary btn-block"/>
                                                </form>
                                        </div>
                                </div>
                        </div>
                </div>
        </div>  
                      

        )
}
     
