import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Style from '../../Styles/StyleCheckout.module.css';
import * as FaIcons from 'react-icons/fa';
import { cleanRegistered, getCheckout, register, setUserRegister } from '../../actions';
import { useHistory, useParams } from 'react-router';
import { normalizeNullOrUndefined } from '../../actions/normalizeNullOrUndefined';

export default function Checkout() {
        const mercadoPagoUrl = useSelector(state => state.mercadoPagoUrl);
        const dispatch = useDispatch();
        const history = useHistory();
        const params = useParams();
        const userRegister = useSelector(state => state.userRegister);
        const registered = useSelector(state => state.registered);
        useEffect(()=> {
                if (!!history.location.search) {
                        const obj = {};
                        history.location.search.split('?')[1].split('&')
                        .map (e => e.split('=')).forEach(e => obj[e[0]] = e[1]);

                        if (!!Object.keys(userRegister).length && !!obj && obj.status === 'approved') {
                                dispatch(register({...userRegister, ...obj}));
                        };
                }
                if (!!Object.keys(params).length) {
                        const { userRegister } = params;

                        if (!!userRegister) {
                                dispatch(setUserRegister(JSON.parse(userRegister)));
                                sessionStorage.userRegister = userRegister;
                                history.push('/checkout');
                        }
                }
        }, [history.location.search, params, userRegister]);

        useEffect(() => {
                let userRegister = normalizeNullOrUndefined(sessionStorage.userRegister);
                userRegister = userRegister ? JSON.parse(userRegister) : {};
                dispatch(setUserRegister(userRegister));
                if (registered && sessionStorage.userRegister) {
                        sessionStorage.userRegister = JSON.stringify({});
                        dispatch(setUserRegister({}));
                        dispatch(cleanRegistered());
                        history.push('/');
                }
              },[registered]);

        function handleSubmit(e) {
                e.preventDefault();
                dispatch(getCheckout())
        }

        useEffect(() => {
             if (mercadoPagoUrl){
                const anchor = document.getElementById('mercadoPagoUrl');
                anchor.click();
             }  
        }, [mercadoPagoUrl]);
        
        return (
                <div>
                        <h3>SUSCRIPCIÓN</h3>
                        <div className={Style.cards}>
                                <div className={Style.card}>
                                        <h4>Plan Free</h4>
                                        <ul>
                                                <div className={Style.li}><li className={Style.txt}>Accede a Recetas Free</li><FaIcons.FaRegCalendarCheck /> </div>
                                                <div className={Style.li}><li className={Style.txt}>Agrega Recetas a tu Calendario</li><FaIcons.FaRegCalendarCheck /> </div>
                                                <div className={Style.li}><li className={Style.txt}>Ver Instrucciones de las Recetas</li><FaIcons.FaRegCalendarCheck /> </div>
                                                <div className={Style.li}><li className={Style.txt} id={Style.id}>Accede a Recetas Premium</li><FaIcons.FaRegCalendarTimes /> </div>
                                                <div className={Style.li}><li className={Style.txt} id={Style.id}>Crea tus Calendarios Semanales</li><FaIcons.FaRegCalendarTimes /> </div>
                                                <div className={Style.li}><li className={Style.txt} id={Style.id}>Crear Recetas</li><FaIcons.FaRegCalendarTimes /> </div>
                                                <div className={Style.li}><li className={Style.txt} id={Style.id}>Dar Like y FeedBack en las Recetas</li><FaIcons.FaRegCalendarTimes /> </div>
                                        </ul>
                                        <h4>$0</h4>
                                </div>
                                <div className={Style.card}>
                                        <h4>Plan Premium</h4>
                                        <div>

                                        </div>
                                        <ul>
                                                <div className={Style.li}><li className={Style.txt}>Accede a Recetas Free</li><FaIcons.FaRegCalendarCheck /> </div>
                                                <div className={Style.li}><li className={Style.txt}>Agrega Recetas a tu Calendario</li><FaIcons.FaRegCalendarCheck /> </div>
                                                <div className={Style.li}><li className={Style.txt}>Ver Instrucciones de las Recetas</li><FaIcons.FaRegCalendarCheck /> </div>
                                                <div className={Style.li}><li className={Style.txt}>Accede a Recetas Premium</li><FaIcons.FaRegCalendarCheck /> </div>
                                                <div className={Style.li}><li className={Style.txt}>Crea tus Calendarios Semanales</li><FaIcons.FaRegCalendarCheck /> </div>
                                                <div className={Style.li}><li className={Style.txt}>Crear Recetas</li><FaIcons.FaRegCalendarCheck /> </div>
                                                <div className={Style.li}><li className={Style.txt}>Dar Like y FeedBack en las Recetas</li><FaIcons.FaRegCalendarCheck /> </div>
                                        </ul>
                                        <h4>Suscripción Mensual de $500 </h4>
                                        <div>
                                                <form onSubmit={handleSubmit}>
                                                        <button type="submit" className="btn btn-primary btn-block">Suscribirse</button>
                                                        <a href={mercadoPagoUrl} id='mercadoPagoUrl'></a>
                                                </form>
                                        </div>
                                </div>
                        </div>
                </div>


        )
}

