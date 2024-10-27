import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ViewConfigScreen from './pages/ViewConfigScreen';
import TemperatureLogFormScreen from './pages/TemperatureLogFormScreen';
import Nav from './components/Nav';
import Header from './components/Header';
import './App.css'
import ViewLogsScreen from './pages/ViewLogsScreen';

function App() {
  

  return (
    <Router>
        <Header />
        <Nav />
        {/* <div className=""></div> */}
      {/* <div className='container'> */}
        <div className="background">

          <div className="content">
            <Routes>
              <Route path="/" element={<ViewConfigScreen />} />
              <Route path="/temperature" element={<TemperatureLogFormScreen />} /> 
              <Route path="/logs" element={<ViewLogsScreen />} />
            </Routes> 
          </div>
        </div>
        {/* </div> */}
    </Router>
  )
}

export default App
