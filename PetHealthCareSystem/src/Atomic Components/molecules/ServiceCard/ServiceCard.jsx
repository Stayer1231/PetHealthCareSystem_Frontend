import React from "react";
import Text from "../../atoms/Text/Text";
import './ServiceCard.scss';

function ServiceCard( data ){

    return(
        <div className="service-card-container">
            <div className="service-card-title-container">
                <Text content={data.data.serviceTitle + " >"} type={"h4"} className={"service-card-title-text"}/>
            </div>
            <div className="service-card-description-container">
                <Text content={data.data.serviceDescription} type={"p"} className={"service-card-description-text"}/>
            </div>
        </div>
    )

}

export default ServiceCard;