import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Nav from './Components/Nav/Nav'
import Home from './Components/Home/Home'
import SearchCards from './Components/SearchBar/SearchCards/SearchCards'
import CreateRecipe from './Components/CreateRecipe/CreateRecipe.jsx'
import GlobalStyles from './Styles/GlobalStyle.css'
import Login from './Components/Acount/Login.jsx'
import ShopingCart from './Components/ShopingCart/ShopingCart.jsx'
import Footer from './Components/Footer/Footer';
import UpdateForm from './Components/UpdateForm/UpdateForm'
import Register from './Components/Acount/Register';
import AllRecipe from './Components/Inventary/AllRecipe';
import Calendar from './Components/ShopingCart/Calendar/Calendar';
import CalendarDetail from './Components/ShopingCart/Calendar/CalendarDetail';
import AdminUser from './Components/Usuarios/AdminUser/AdminUser';
import { Redirect } from 'react-router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { normalizeNullOrUndefined } from './actions/normalizeNullOrUndefined';
import { setUserAndToken } from './actions';
import Inventary from './Components/Inventary/Inventary.jsx'
import DetailRecipe from './Components/DetailRecipe/DetailRecipe'
import PruebaDetail from './Components/DetailRecipe/DetailEnProcesoPrueba'
import RecoverPass from './Components/Acount/RecoverPass';
import UserDetails from './Components/Usuarios/AdminUser/UserDetails';
import UserOnly from './Components/Usuarios/User/UserOnly';
import Checkout from './Components/Checkout/Checkout';

import InventaryNav from './Components/Inventary/InventaryNav'

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const token = normalizeNullOrUndefined(sessionStorage.token);
    let user = normalizeNullOrUndefined(sessionStorage.user);
    if(user) user = JSON.parse(user);
    dispatch(setUserAndToken({ token, user }));
  },[]);

  const token = useSelector(state => state.token);
  const user = useSelector(state => state.user);

  return (
    <BrowserRouter>
    <div className="App">
    <Nav/>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path = '/search/:name' component={SearchCards}/>
        <Route path='/recipe/:id' component={PruebaDetail}/>
        <Route path = '/create/recipe' render= {() => (!!token) ? <CreateRecipe /> : <Redirect to='/' />}/>
        <Route exact path = '/update/:id' render= {() => (!!token && user.category === 'Admin') ? <UpdateForm /> : <Redirect to='/' />}/>
        <Route path = '/acount/register/:email' component={Register}/>
        <Route path = '/acount/register' component={Register}/>
        <Route path = '/acount/recovery' component={RecoverPass}/>
        <Route path = '/acount/google/:token/:user' component={Login} />
        <Route path = '/acount/login/:email' component={Login}/>
        <Route path = '/acount/login' component={Login}/>
        <Route path = '/shop' component={ShopingCart}/>
        <Route path = '/AllRecipe' component = {AllRecipe}/>
        <Route exact path = '/calendar'render= {() => (!!token) ? <Calendar admin={true}/> : <Redirect to='/' />}/>
        <Route exact path = '/calendar/user'render= {() => (!!token) ? <Calendar /> : <Redirect to='/' />}/>
        <Route path = '/calendar/:id' render= {() => (!!token) ? <CalendarDetail /> : <Redirect to='/' />}/>
        <Route exact path = '/user' render= {() => (!!token && user.category === 'Admin') ? <AdminUser /> : <Redirect to='/' />}/>
        <Route path = '/reviews/user/:id' render= {() => (!!token && user.category === 'Admin') ? <UserDetails /> : <Redirect to='/' />}/>
        <Route path = '/inventary' render= {() => (!!token)? <Inventary/>: <Redirect to='/' />}/>
        <Route exact path = '/user/noAdmin' render= {() => (!!token)? <UserOnly/>: <Redirect to='/' />}/>
        <Route path = '/checkout/:userRegister' component={Checkout}/>
        <Route path = '/checkout' component={Checkout}/>
        <Route render={()=><Redirect to='/' />} />
      </Switch>
    </div>
      <Footer/>
    </BrowserRouter>
  )
}

export default App;
