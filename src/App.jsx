import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';

const App = () => {
  return (
    <div className='px-4 sm:[5vw] md:px-[7vw] lg:px-[9vw]'>
      <Navbar />
      <Routes>
      <Route path='/' element={<Login/>} />
        <Route path='/Home' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
    </div>
  );
};

export default App;

