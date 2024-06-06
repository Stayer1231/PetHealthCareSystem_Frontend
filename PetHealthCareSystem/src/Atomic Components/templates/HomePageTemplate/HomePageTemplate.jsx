import React from "react";
import "./HomePageTemplate.scss";
import { Outlet } from "react-router-dom";
import Text from "../../atoms/Text/Text";
import Button from "../../atoms/Button/Button";

function HomePageTemplate() {
    return (
        <>
            <div className='user-book-appointment-controller-container'>
                <div className="user-book-appointment-controller">
                    <Text
                        content={'Everything Veterinary CareFor Your Everything Companion'}
                        className={'user-book-appointment-controller-title-text'} />

                    <Text
                        content={'Primary, specialty, & emergency care that meets all of your pets healthcare needs.'}
                        className={"user-book-appointment-controller-detail-text"} />

                    <Button
                        content="Book Appointment"
                        className={'user-book-appointment-controller-button'}
                    />
                </div>
                <div className="user-book-appointment-controller-img-container">
                    <img src="https://images.ctfassets.net/8hq8guzcncfs/gBh0U7Yt94KdxO8H6bvzV/f76e3d19224091f28fda339a6b640396/d2.png?fm=webp" alt="" />
                </div>
            </div>
        </>
    );
}

export default HomePageTemplate;