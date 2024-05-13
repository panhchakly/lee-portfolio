import React from 'react';
import './Navbar.css';
import Toggle from '../Toggle/Toggle';
import { Link } from 'react-scroll';

function Navbar() {
  return (
    <div className='n-wrapper'>
      <div className="n-left">
        <div className="n-name">Panhchakly</div>
        <Toggle />
      </div>
      <div className="n-right">
        <div className="n-list">
          <ul style={{listStyle: "none"}}>
            <Link spy={true} to="Navbar" smooth={true}>
              <li>Home</li>
            </Link>
            <Link spy={true} to="Services" smooth={true}>
              <li>Services</li>
            </Link>
            <Link spy={true} to="Experience" smooth={true}>
              <li>Experience</li>
            </Link>
            <Link spy={true} to="Portfolio" smooth={true}>
              <li>Portfolio</li>
            </Link>
            <Link spy={true} to="Testimonial" smooth={true}>
              <li>Testimonial</li>
            </Link>
          </ul>
        </div>
        <button className="button n-button">Contact us</button>
      </div>
    </div>
  )
}

export default Navbar