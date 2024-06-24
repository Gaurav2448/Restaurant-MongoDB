import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navbar } from './components';
import Home from './Routes/Home'
import Book from './Routes/Book'
import View from './Routes/View';
import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { AboutUs, Footer, Laurels, SpecialMenu } from './container';
import { BookUpdate } from './Routes/BookUpdate';


const App = () => (
  <div>
    <BrowserRouter>
      
      <Navbar/>
      
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<AboutUs/>}/>
          <Route path='/menu' element={<SpecialMenu/>}/>
          <Route path='/awards' element={<Laurels/>}/>
          <Route path='/book' element={<Book/>}/>
          <Route path='/view' element={<View/>}/>
          <Route path='/view/:id/edit' element={<BookUpdate/>}/>
          
        </Routes>

        <Footer/>
    
    </BrowserRouter>
    <ToastContainer />
  </div>
);

export default App;
