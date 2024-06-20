import React from "react";
import "./VetInfoCard.scss";
import Text from "../../atoms/Text/Text";

function VetInfoCard({ data, displayMessage, onClick, isSelected }) {

    return (
        <>
            <div className={`vet-card-container ${isSelected ? 'selected' : ''}`} onClick={onClick}>
                <div className="vet-card-image-container">
                    <img
                        src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwdIVSqaMsmZyDbr9mDPk06Nss404fosHjLg&s"}
                        alt={data.fullName}
                        className="vet-card-image"
                    />
                </div>
                <div className="vet-card-details-container">
                    <div className="vet-card-name">
                        <Text
                            content={data.fullName}
                            type={"h4"}
                            className={"vet-card-name-content"}
                        />
                    </div>
                    <div className="vet-card-sub-details">
                        <Text
                            content={data.email}
                            type={"subtitle"}
                            className={"vet-card-address-content"}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default VetInfoCard;