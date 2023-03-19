import logo from './logo.svg';
import './App.css';
import {Routes, Route} from "react-router-dom";
import {Header} from './components/Header/Header'
import {ProductList} from './components/ProductList/ProductList'
import {Form} from './components/Form/Form'
import { useTelegram } from './hooks/useTelegram';
import {React, useCallback, useEffect, useState} from 'react';
 
function App() {
  const {onToggleButton, tg} = useTelegram();

  useEffect(()=>{
    tg.ready()
  }, [])

  const closeEvent =()=>{
    tg.close()
  }
  return (
    <div className="App">
      <div className='container' >
        <Header/>
        <Routes>
          <Route index element = {<ProductList/>}/>
          <Route path = {'/form'} element={<Form/>}/>
        </Routes>
        <button onClick = {closeEvent} className="btn"></button>
      </div>
    </div>
  );
}

export default App;
