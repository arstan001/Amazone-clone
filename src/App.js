import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header';
import Home from './components/Home';
import Checkout from './components/Checkout';
import Login from './components/Login';
import { useEffect } from 'react';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import Payment from './components/Payment';
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js';
import Orders from './components/Orders';
const promise = loadStripe('pk_test_51K4gDTKVUoLX2yMsQTcegD6McCKoBhKIe1S96KXEh0K7MakCytSBCjLuaXBYniSXN1BJsejnGPrb9JdQrnNi2Rir00GkkcIcY1');

function App() {
  const [{ }, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      }
      else {
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path='/' element={<><Header /><Home /></>} />
          <Route path='/login' element={<Login />} />
          <Route path='/checkout' element={<><Header /><Checkout /></>} />
          <Route path='/payment' element={<><Header /><Elements stripe={promise}><Payment /></Elements></>} />
          <Route path='/orders' element={<><Header /><Orders /></>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
