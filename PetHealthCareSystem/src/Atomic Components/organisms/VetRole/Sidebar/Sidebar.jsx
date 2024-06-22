import React from 'react'
import './Sidebar.scss'
import { Link } from 'react-router-dom'
import Text from '../../../atoms/Text/Text'

function Sidebar() {
    return (
        <div className='vet-sidebar-container'>
            <ul className='item-container'>
                <li className="item">
                    <Link to={"/work-schedule"}>
                        <Text content={"Xem lịch làm"} type={"subtitle"} cursor={"pointer"} />
                    </Link>
                </li>
                <li className="item">
                    <Link to={"/medical-record"}
                    ><Text content={"Hồ sơ khám bệnh"} type={"subtitle"} cursor={"pointer"} />
                    </Link>
                </li>
                <li className="item">
                    <Link to={"/hospitalize-record"}>
                        <Text content={"Hồ sơ nhập viện"} type={"subtitle"} cursor={"pointer"} />
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar