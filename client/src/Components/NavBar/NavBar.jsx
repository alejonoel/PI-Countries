import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <div className='navbar-contenedor'>
        <div className='navbar-img'>
            <img src="navbar.webp" alt="" />
        </div>
        <div className='navbar-link'>
            <Link to={"/home"}>Home</Link>
            <Link to={"/form"}>Formulario</Link>
        </div>
    </div>
  )
}

export default NavBar