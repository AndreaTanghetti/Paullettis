import './App.css'
import ItemListConteiner from './components/ItemListConteiner/ItemListConteiner'
import ItemDetailConteiner from './components/ItemDetailConteiner/ItemDetailConteiner'
import NavBar from './components/NavBar/NavBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CarritoProvider } from './context/CarritoContext'
import Cart from './components/Cart/Cart'
import Checkout from './components/Checkout/Checkout'
import Home from './components/Home/Home'
import LoginCrear from './components/Login/LoginCrear'
import LoginIniciar from './components/Login/LoginIniciar'
function App() {


  return (
    <>
      <BrowserRouter>
        <CarritoProvider>
          <NavBar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/productos' element={<ItemListConteiner />} />
            <Route path='/categoria/:idCat' element={<ItemListConteiner />} />
            <Route path='/item/:id' element={<ItemDetailConteiner />} />
            <Route path='*' element={<h2>Ups! Sitio en construccion</h2>} />
            <Route path= '/cart' element= {<Cart/>}></Route>
            <Route path= '/checkout' element= {<Checkout/>}></Route>
            <Route path='/crearcuenta' element={<LoginCrear />} />
            <Route path='/iniciarsesion' element={<LoginIniciar/>} />

          </Routes>
        </CarritoProvider>
      </BrowserRouter>
    </>
  )
}

export default App
