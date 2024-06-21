import React from "react";
import './TimeFrameCard.scss';
import Text from "../../atoms/Text/Text";

function TimeFrameCard({ data, onClick, isSelected }) {
    return (
        <div className={`time-frame-card-container ${isSelected ? 'selected' : ''}`} onClick={onClick}>
            <div className="time-frame-card-content">
                <Text
                    content={data.startTime.substring(0, 5)}
                    type={"h4"}
                    className={"start-time"}
                />
                <Text
                    content={"-"}
                    type={"h4"}
                    className={"separator"}
                />
                <Text
                    content={data.endTime.substring(0, 5)}
                    type={"h4"}
                    className={"end-time"}
                />
            </div>
        </div>
    )
}

export default TimeFrameCard;
