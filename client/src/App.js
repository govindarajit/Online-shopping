import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import { Container } from 'reactstrap';
import store from './store';
import { loadUser } from './actions/authActions';
import Home from './components/auth/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter,Route, Switch } from 'react-router-dom';
import Cart from './components/auth/cart';
import Favorites from './components/auth/Favorites';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
    
      <BrowserRouter>
        <div className='App'>
          <AppNavbar />
          <Container>
        
            <Switch>
            <Route exact path="/" component={Home}/>
                    <Route path="/cart" component={Cart}/>
                    <Route path="/Favorites" component={Favorites}/>
                    </Switch>
          </Container>
          
        </div>
        </BrowserRouter>
    
    );
  }
}

export default App;

