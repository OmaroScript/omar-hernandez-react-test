import { useState } from 'react'
import './App.css'
import { HashRouter, Navigate } from 'react-router-dom'
import {
  BrowserRouter as Router, Routes, Route,
} from 'react-router-dom';
import Login from './components/Login';
import Employees from './components/Employees';
import Upload from './components/Upload';
import { Link } from 'react-router-dom';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  
  const setInfo = (username: string, password: string) => {
    if (username === 'omar' && password === '1234') {
      // Las credenciales son válidas, iniciar sesión en la aplicación
      console.log('Sesión iniciada!');
      // Aquí iría la lógica para redirigir al usuario a la página de inicio de sesión exitosa
      setIsLoggedIn(true)
    } else {
      // Las credenciales no son válidas, mostrar un mensaje de error
      console.log('Error de inicio de sesión');
      // Aquí iría la lógica para mostrar un mensaje de error al usuario
    }
  };

  const logOut = () => {
    setIsLoggedIn(false)
  }

  return (
    <div className="App">
      <HashRouter>
        <header>
          <Link to="/">Login</Link>
          <Link to="/employees">Empleados</Link>
          <Link to="/upload">Imagenes</Link>
          <a onClick={logOut}>Cerrar Sesión</a>
        </header>
        <Routes>
          <Route path="/" element={<Login setInfoUser={setInfo}/>} />
          <Route path="/employees" element={isLoggedIn ? <Employees /> : <Navigate to='/' replace />} />
          <Route path="/upload" element={isLoggedIn ? <Upload /> : <Navigate to='/' replace />} />
          <Route path='*' element={isLoggedIn ? <Employees /> : <Navigate to='/' replace />}/>
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
