import React, { useState } from "react";
import './VetInfoBlock.scss';
import Text from "../../../atoms/Text/Text";
import VetInfoCard from "../../../molecules/VetInfoCard/VetInfoCard";
import APIInUse from "../../../../config/axios/AxiosInUse";

function VetInfoBlock() {
    const [vets, setVets] = useState([]);
    const displayVet = vets.slice(0,3);

    const handleLoadVets = async () => {
        try {
            const response = await APIInUse.get('Vet/list');
            setVets(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        handleLoadVets();
        console.log(vets);
    }, []);

    return (
        <div className="vet-info-block-container">
            <img 
            className="vet-info-block-img"
            src="https://images.ctfassets.net/8hq8guzcncfs/2MT215hjQ4UVEihijeNrX9/333a2ec2d6ca2f65a9a18e2387041146/backgroundtopdesktop.jpg?fm=webp" alt="" />

            <div className="vet-info-block-content">
                <div className="vet-info-block-content-text">
                    <Text content={"Các bác sĩ tiêu biểu"} type={"h1"} className={"vet-info-block-content-h1"} />
                    <br/>
                    <Text content={'Các bác sĩ thú y của chúng tôi có kiến thức rộng lớn, nhiều năm kinh nghiệm và đam mê không ngừng để cung cấp dịch vụ chăm sóc xuất sắc cho những người bạn thú cưng của bạn.'}
                    type={"h4"}
                    className={"vet-info-block-content-h4"}
                    />
                </div>
                <div className="vet-info-block-content-detail">
                    {displayVet.map((vet,index) =>
                        <VetInfoCard key={index} data={vet} displayMessage={true}/>)
                    }
                </div>
            </div>
        </div>
    )
}

export default VetInfoBlock;