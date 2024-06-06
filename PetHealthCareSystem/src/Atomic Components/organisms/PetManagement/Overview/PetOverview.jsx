import React from 'react'
import './PetOverview.scss'
import Text from '../../../atoms/Text/Text'
import PetCard from '../../../molecules/PetCard/PetCard'

function PetOverview() {
    return (
        <div className='pet-overview-container'>
            <div className='greeting-container'>
                <Text content={`Welcome Back, ${"Username"}`} type={"h3"} className={"greeting-content"} />
            </div>
            <div className='pet-list-container'>
                <PetCard data={""} />
                <PetCard data={""} />
            </div>
        </div>
    )
}

export default PetOverview
