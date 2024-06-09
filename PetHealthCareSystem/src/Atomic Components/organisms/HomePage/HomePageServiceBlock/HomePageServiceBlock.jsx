import React from "react";
import './HomePageServiceBlock.scss';
import serviceData from'../../../../TestData/ServiceData/serviceData.json';
import ServiceCard from "../../../molecules/ServiceCard/ServiceCard";
import Text from "../../../atoms/Text/Text";

function HomePageServiceBlock(){

    const displayedServices = serviceData.slice(0, 6);
    return(
        <>
            <Text content={"Dịch vụ của chúng tôi"} className={"service-block-title"} type={"h1"}/>
            <Text content={'Chúng tôi cung cấp dịch vụ thú y và chăm sóc sức khỏe tổng thể để đáp ứng tất cả các nhu cầu chăm sóc sức khỏe của thú cưng của bạn.'}
                className={"service-block-description"} type={"h4"}/>
            <div className="service-block-container">
                {displayedServices?.map((service, index) => 
                <div className="service-card">
                    <ServiceCard data={service} key={index}/>
                </div>)
                }
            </div>
        </>
    )
}

export default HomePageServiceBlock;