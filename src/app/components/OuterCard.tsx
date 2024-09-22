import React from 'react';
import ImageContainer from './ImageContainer';
import checkBlueIcon from "../../assets/Icons/checkBlue.svg"
import checkGreenIcon from "../../assets/Icons/checkGreen.svg"
import warningRed from "../../assets/Icons/warningRed.svg"

interface OuterCardInterface {
    title: string;
    text: string;
    buttonText: string;
    styles?: string;
    children?: any;
    handleStep?: any;
    showStep?: string;
    connectionStatus?: boolean | null;
    value: string;
    icon?: any;
}

const OuterCard = ({ title, text, buttonText, children, styles, handleStep, showStep, connectionStatus, value, icon }: OuterCardInterface) => {
    return (
        <div className="p-4 my-8 border rounded-lg" >
            <div className="flex items-center justify-between cursor-pointer" onClick={() => handleStep(value)} >
                <div className="flex items-center gap-4 ">
                    <ImageContainer icon={icon ? icon : connectionStatus ? checkGreenIcon : connectionStatus === false ? warningRed : checkBlueIcon} size={30} />
                    <div>
                        <h3 className="text-lg font-semibold mb-1">{title}</h3>
                        <p className="text-gray-600">{text}</p>
                    </div>
                </div>
                {!showStep && <button className={`float-right rounded ${styles} text-white px-4 py-2`} >{buttonText}</button>}
            </div>
            {showStep === value ?
                children : <></>}
        </div>
    );
};

export default OuterCard;