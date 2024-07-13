import React, { useEffect, useState } from "react";
import './HomePageServiceBlock.scss';
import ServiceCard from "../../../molecules/ServiceCard/ServiceCard";
import Text from "../../../atoms/Text/Text";
import Button from "../../../atoms/Button/Button";
import APIInUse from "../../../../config/axios/AxiosInUse";
import {
    setAllService,
    setDisplayedServiceData
} from "../../../../config/store/HomePage/homePage";
import { useDispatch, useSelector } from "react-redux";

function HomePageServiceBlock() {
    const displayedServices = useSelector((state) => state.homePage.displayedServiceData);
    const serviceData = useSelector((state) => state.homePage.allService);
    const dispatch = useDispatch();

    const handleLoadServices = async () => {
        try {
            const response = await APIInUse.get("Service/get-all");
            dispatch(setAllService(response.data.data));
        } catch (error) {
            console.log(error);
        }
    };

    const handleDisplayedService = async () =>{
        let tempdata = [];
        tempdata = serviceData.slice(0,6);
        dispatch(setDisplayedServiceData(tempdata));
    }

    useEffect(() => {
        handleLoadServices();
        handleDisplayedService();
    },[]);


    return (
        <>
            <div className="service-block-container-container">
                <Text content={"Dịch vụ của chúng tôi"} className={"service-block-title"} type={"h1"} />
                <Text content={'Chúng tôi cung cấp dịch vụ thú y và chăm sóc sức khỏe tổng thể để đáp ứng tất cả các nhu cầu chăm sóc sức khỏe của thú cưng của bạn.'}
                    className={"service-block-description"} type={"h4"} />
                <div className="service-block-container">
                    {displayedServices?.map((service, index) =>
                        <div className="service-card">
                            <ServiceCard data={service} key={index} />
                        </div>)
                    }
                </div>
                <div className="service-block-button-container">
                    <Button content={"Xem tất cả dịch vụ"} className={"service-block-button"} />
                </div>
            </div>
        </>
    )
}

export default HomePageServiceBlock;