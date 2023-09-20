import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <div className='navbar-contenedor'>
        <div className='navbar-img'>
            <Link to={"/"}><img src="/navbar.webp" alt="" /></Link>
        </div>
        <div className='navbar-link'>
            <Link to={"/home"}>Home</Link>
            <Link to={"/form"}>Create Activity</Link>
        </div>
    </div>
  )
}

export default NavBar