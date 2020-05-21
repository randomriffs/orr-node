import React, { useState, useEffect } from 'react';
import './navbarComponent.css'
import { Link } from 'react-router-dom';
const moment = require('moment');

export default function NavbarComponent() {
    const [date,setDate] = useState('');
    let currentDate = moment().format('MMMM Do YYYY, h:mm:ss a');
    useEffect(() => {
        const interval = setInterval(() => {
          setDate(currentDate+'')
        }, 1000);
        return () => clearInterval(interval);
      }, [date]);
    return (
        <div className="nav-container container">
            {/* <img className="header-img"></img> */}
            <Link to='/'><h1>Orr</h1></Link>
            <ul id='date'>
                <li>
                    {/* <Link to='/'>Home</Link>   */}
                    {/* <p>{currentDate}</p> */}
                    {date}
                </li>
                <li>
                    {/* <a href="#">Admin</a> */}
                </li>
            </ul>
        </div>
    )

}
