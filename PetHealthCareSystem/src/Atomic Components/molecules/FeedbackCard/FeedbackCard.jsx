import React from "react";
import StarRating from "../StarRating/StarRating";
import Text from "../../atoms/Text/Text";
import "./FeedbackCard.scss";

function FeedbackCard( data ) {

    return (
        <div className="feedback-card-container">
            <div className="feedback-card-header">
                <StarRating
                className={"feedback-card-star-rating"} 
                score={data.data.score} />
            </div>

            <div className="feedback-card-body">
                <Text content={data.data.message} type={"p"} className={"feedback-card-description"} />
            </div>

            <div className="feedback-card-footer">
                <Text content={data.data.customerName} type={"h4"} className={"feedback-card-name"} />
            </div>
        </div>
    )
}

export default FeedbackCard;