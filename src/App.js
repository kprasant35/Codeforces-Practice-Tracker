import React, { useEffect } from 'react';
import './App.css';
import HandleForm from './components/handleform';

function App() {
  useEffect(()=>{
    document.body.style.background='#efefef';
  })
  return ( <div className="container">
    <HandleForm />
  </div>);
}

export default App;
