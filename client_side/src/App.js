import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavBar from './components/AppNavBar/AppNavBar';
import ShoppingList from './components/ShoppingList/ShoppingList';
import './App.css';
import { loadUser } from './features/auth/authSlice';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [])

  return (
    <div className="App">
      <AppNavBar />
      <ShoppingList />
    </div>
  )

}

export default App;
