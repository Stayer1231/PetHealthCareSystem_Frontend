import React from "react";
import Text from "../../atoms/Text/Text";
import './ServiceCard.scss';

function ServiceCard({ data, onClick, isSelected }) {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('de-DE').format(price);
    };

    return (
        <div
            className={`service-card-container ${isSelected ? 'selected' : ''}`}
            onClick={onClick}
        >
            <div className="service-card-title-container">
                <Text
                    content={data.name}
                    type={"h4"}
                    className={"service-card-title-text"}
                />
            </div>
            <div className="service-card-description-container">
                <Text
                    content={data.description}
                    type={"p"}
                    className={"service-card-description-text"}
                />
                <Text
                    content={`${new Intl.NumberFormat('de-DE').format(data.price)} VND`}
                    type={"h6"}
                    className={"service-card-price-text"}
                />
            </div>
        </div>
    );
}

export default ServiceCard;
