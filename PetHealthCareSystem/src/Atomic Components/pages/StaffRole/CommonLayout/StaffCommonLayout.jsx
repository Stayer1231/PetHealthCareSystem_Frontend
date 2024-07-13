import React from 'react'
import SideBar from '../../../organisms/StaffRole/SideBar/SideBar'
import { Outlet } from 'react-router-dom'
import './StaffCommonLayout.scss'

function StaffCommonLayout() {
    return (
        <nav className='staff-common-layout-container'>
            <div className='staff-sidebar-layout'>
                <SideBar />
            </div>

            <div className='staff-page-container'>
                <Outlet />
            </div>
        </nav>
    )
}

export default StaffCommonLayout
