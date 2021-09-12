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
import Inventary from './Components/Inventary/Inventary';
import AllRecipe from './Components/Inventary/AllRecipe';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Nav/>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path = '/search/:name' component={SearchCards}/>
        <Route path='/recipe/:id' component={DetailRecipe}/>
        <Route path = '/create/recipe' component={CreateRecipe}/>
        <Route exact path = '/update/:id' component={UpdateForm}/>
        <Route path = '/acount/register' component={Register}/>
        <Route path = '/acount/login' component={Login}/>
        <Route path = '/shop' component={ShopingCart}/>
        <Route path = '/AllRecipe' component = {AllRecipe}/>
      </Switch>
      <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
