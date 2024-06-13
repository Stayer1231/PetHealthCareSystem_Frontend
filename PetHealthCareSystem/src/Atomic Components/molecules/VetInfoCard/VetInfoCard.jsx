import React from "react";
import "./VetInfoCard.scss";
import Text from "../../atoms/Text/Text";

function VetInfoCard({ data, displayMessage }) {

    return (
        <>
            <div className='vet-card-container'>
                <img
                    className="vet-img"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwdIVSqaMsmZyDbr9mDPk06Nss404fosHjLg&s" alt="" />
                <div className="vet-card-name">
                    <Text className={'vet-name-text'} type={'p'} content={data.vetName} />
                </div>
                <div className="vet-card-certification">
                    <Text className={'vet-certification-text'} type={'p'} content={data.certificate} />
                </div>
                {!displayMessage ?
                    <>
                    </>
                    :
                    <>
                        <div className="vet-card-message">
                            <Text className={'vet-message-text'} type={'p'} content={data.message} />
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default VetInfoCard;