import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../../organisms/VetRole/Sidebar/Sidebar'
import './VetCommonLayout.scss'

function VetCommonLayout() {
    return (
        <nav className='vet-common-layout-container'>
            <div className='vet-sidebar-layout'>
                <Sidebar />
            </div>

            <div className='vet-page-container'>
                <Outlet />
            </div>
        </nav>
    )
}

export default VetCommonLayout
