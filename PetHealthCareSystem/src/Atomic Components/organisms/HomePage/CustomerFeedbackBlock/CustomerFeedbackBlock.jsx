import React from "react";
import feedbackData from'../../../../TestData/FeedbackData/feedbackData.json';
import FeedbackCard from "../../../molecules/FeedbackCard/FeedbackCard";
import './CustomerFeedbackBlock.scss';
import Text from "../../../atoms/Text/Text";

function CustomerFeedbackBlock() {
    const displayedFeedbacks = feedbackData.slice(0, 3);

    return (
        <>
        <div className="customer-feedback-title-container">
            <Text content={'Trãi nghiệm của khách hàng'} type={"h1"} className={"customer-feedback-title"} />
        </div>

        <div className="customer-feedback-block-container">

            {displayedFeedbacks?.map((feedback, index) =>
                <FeedbackCard data={feedback} key={index} />
            )}

        </div>
        </>
    )
}

export default CustomerFeedbackBlock