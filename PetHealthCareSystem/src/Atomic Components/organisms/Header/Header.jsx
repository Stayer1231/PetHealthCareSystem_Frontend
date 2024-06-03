import React from 'react'
import './Header.scss'
import Logo from "../../../assets/img/dog_logo.jpg"
import { Link } from 'react-router-dom'

function Header() {
    return (
        <header className='header-container'>
            <div className='logo-container'>
                <img src={Logo} alt="" />
            </div>
            <nav className='nav-container'>
                <ul className='nav-list'>
                    <Link to='/' className='nav-item'>
                        <li className='nav-item'>Home</li>
                    </Link>
                    <Link to='/about' className='nav-item'>
                        <li className='nav-item'>About</li>
                    </Link>
                    <Link to='/services' className='nav-item'>
                        <li className='nav-item'>Services</li>
                    </Link>
                    <Link to='/contact' className='nav-item'>
                        <li className='nav-item'>Contact</li>
                    </Link>
                </ul>
            </nav>
        </header>
    )
}

export default Header
