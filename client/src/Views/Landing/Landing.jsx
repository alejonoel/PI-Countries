import React from 'react';
import {Link} from 'react-router-dom'
import '../../Styles/styles.css'

const Landing = () => {
  return (
    <div>
      <div className='landing'>
        <h1>COUNTRIES</h1>
      </div>
      <div>
        <Link className='landing-buttom' to={"/home"}>HOME</Link>
      </div>
    </div>
  )
}

export default Landing