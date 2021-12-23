import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header';
import Home from './components/Home';
import Checkout from './components/Checkout';
import Login from './components/Login';
import { useEffect, useState } from 'react';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import Payment from './components/Payment';
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js';
import Orders from './components/Orders';
import axios from 'axios';
const promise = loadStripe('pk_test_51K4gDTKVUoLX2yMsQTcegD6McCKoBhKIe1S96KXEh0K7MakCytSBCjLuaXBYniSXN1BJsejnGPrb9JdQrnNi2Rir00GkkcIcY1');

function App() {
  const [{ location }, dispatch] = useStateValue();
  useEffect(() => {
    const loadData = async () => {
      await axios.get('https://fakestoreapi.com/products')
        .then(res => dispatch({ type: 'PRODUCTS', products: res.data }))
        .catch(e => console.log('Data couldnt be loaded. error: ', e))
    }
    if ("geolocation" in navigator && location === '') {
      navigator.geolocation.getCurrentPosition((pos) => {
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${pos.coords.latitude},${pos.coords.longitude}&sensor=false&key=AIzaSyD6cYPpyDcYWz3xPdNamp8bWGZ-pwX-lho`)
          .then(res => {
            let temp = res.data.results;
            for (let i in temp) {
              let arr = temp[i].types.filter(item => item === 'country')
              if (arr.length !== 0) {
                dispatch({ type: 'LOCATION', location: temp[i].formatted_address })
                break;
              }
            }
          }).catch(e => console.log('err', e))
      })
    }
    else {
      console.log("Not Available");
    }
    loadData();
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
