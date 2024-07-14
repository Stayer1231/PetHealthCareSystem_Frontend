// SimplePetCard.jsx

import React from "react";
import './SimplePetCard.scss';
import Text from "../../atoms/Text/Text";
import DogImg from "../../../assets/img/Dog.jpg";

function SimplePetCard({ data, onClick, isSelected }) {
    return (
        <div className={`simple-pet-card-container ${isSelected ? 'selected' : ''}`} onClick={onClick}>
            <div className="simple-pet-image-container">
                <img
                    src={DogImg}
                    alt={data.name}
                    className="simple-pet-image"
                />
            </div>
            <div className="simple-pet-details-container">
                <div className="simple-pet-name">
                    <Text
                        content={data.name}
                        type={"h4"}
                        className={"simple-pet-name-content"}
                    />
                </div>
                <div className="simple-pet-sub-details">
                    <Text
                        content={data.breed}
                        type={"subtitle"}
                        className={"simple-pet-breed-content"}
                    />
                    <span> - </span>
                    <Text
                        content={data.species}
                        type={"subtitle"}
                        className={"simple-pet-age-content"}
                    />
                </div>
            </div>
        </div>
    );
}

export default SimplePetCard;
