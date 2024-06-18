import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../../organisms/VetRole/Sidebar/Sidebar'
import './VetCommonLayout.scss'

function VetCommonLayout() {
    return (
        <nav className='vet-common-layout-container'>
            <div className='sidebar-container'>
                <Sidebar />
            </div>

            <div className='page-container'>
                <Outlet />
            </div>
        </nav>
    )
}

export default VetCommonLayout
