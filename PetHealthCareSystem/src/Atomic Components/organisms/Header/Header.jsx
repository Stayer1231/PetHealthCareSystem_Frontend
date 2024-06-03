import React from 'react'
import './Header.scss'

function Header() {
    return (
        <header className='header-container'>
            <div className='logo-container'></div>
            <nav className='nav-container'>
                <ul className='nav-list'>
                    <li className='nav-item'>Home</li>
                    <li className='nav-item'>About</li>
                    <li className='nav-item'>Services</li>
                    <li className='nav-item'>Contact</li>
                </ul>
            </nav>
        </header>
    )
}

export default Header
