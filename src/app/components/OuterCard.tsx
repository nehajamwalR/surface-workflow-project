import React from 'react';
import ImageContainer from './ImageContainer';
import checkIcon from "../../assets/Icons/check.svg"
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
}

const OuterCard = ({ title, text, buttonText, children, styles, handleStep, showStep, connectionStatus, value }: OuterCardInterface) => {

    const renderIcon = () => {
        if (value === "install") {
            if (connectionStatus === true) {
                return checkGreenIcon;
            } else if (connectionStatus === false) {
                return warningRed;
            }
        }
        if (showStep === value) {
            return checkBlueIcon;
        } else {
            return checkIcon;
        }
    };

    return (
        <div className="p-4 my-8 border rounded-lg" >
            <div className="flex items-center justify-between cursor-pointer" onClick={() => handleStep(value)} >
                <div className="flex items-center gap-4 ">
                    <ImageContainer icon={renderIcon()} size={30} />
                    <div>
                        <h3 className="text-lg font-semibold mb-1">{title}</h3>
                        <p className="text-gray-600">{text}</p>
                    </div>
                </div>
                {!showStep && <button className={`float-right rounded ${styles} px-4 py-2`} >{buttonText}</button>}
            </div>
            {showStep === value ?
                children : <></>}
        </div>
    );
};

export default OuterCard;