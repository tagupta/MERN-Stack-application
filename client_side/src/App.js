import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavBar from './components/AppNavBar/AppNavBar';
import ShoppingList from './components/ShoppingList/ShoppingList';
import './App.css';

class App extends Component {
  
  render() {
    return (
      <div className="App"> 
         <AppNavBar/>
         <ShoppingList/>
      </div>
    )
  }
}

export default App;
