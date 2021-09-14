import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Nav from './Components/Nav/Nav'
import Home from './Components/Home/Home'
import SearchCards from './Components/SearchCards/SearchCards'
import DetailRecipe from './Components/DetailRecipe/DetailRecipe'
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
import { Redirect } from 'react-router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { normalizeNullOrUndefined } from './actions/normalizeNullOrUndefined';
import { setUserAndToken } from './actions';



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
        <Route path='/recipe/:id' component={DetailRecipe}/>
        <Route path = '/create/recipe' render= {() => (!!token) ? <CreateRecipe /> : <Redirect to='/' />}/>
        <Route exact path = '/update/:id' render= {() => (!!token && user.category === 'Admin') ? <UpdateForm /> : <Redirect to='/' />}/>
        <Route path = '/acount/register' component={Register}/>
        <Route path = '/acount/login' component={Login}/>
        <Route path = '/shop' component={ShopingCart}/>
        <Route path = '/AllRecipe' component = {AllRecipe}/>
        <Route exact path = '/calendar'render= {() => (!!token) ? <Calendar admin={true}/> : <Redirect to='/' />}/>
        <Route exact path = '/calendar/user'render= {() => (!!token) ? <Calendar /> : <Redirect to='/' />}/>
        <Route path = '/calendar/:id' render= {() => (!!token) ? <CalendarDetail /> : <Redirect to='/' />}/>
      </Switch>
      <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
