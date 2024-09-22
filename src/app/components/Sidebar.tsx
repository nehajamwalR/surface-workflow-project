import React, { useState } from 'react';
import ImageContainer from "./ImageContainer"
import userIcon from "../../assets/Icons/user.svg"
import upIcon from "../../assets/Icons/up.svg"
import downIcon from "../../assets/Icons/down.svg"
import homeIcon from "../../assets/Icons/home.svg"
import funnelIcon from "../../assets/Icons/funnel.svg"
import leadsIcon from "../../assets/Icons/leads.svg"
import segmentIcon from "../../assets/Icons/segment.svg"
import workflowIcon from "../../assets/Icons/workflow.svg"
import integrationsIcon from "../../assets/Icons/integrations.svg"
import settingsIcon from "../../assets/Icons/settings.svg"
import closeIcon from "../../assets/Icons/close.svg"
import { AVATAR } from "../../constants"

const sideBarOptions = [
    { icon: <ImageContainer icon={homeIcon} color="text-neutral-300" />, label: 'Overview' },
    { icon: <ImageContainer icon={funnelIcon} />, label: 'Funnels' },
    { icon: <ImageContainer icon={leadsIcon} />, label: 'Leads' },
    { icon: <ImageContainer icon={segmentIcon} />, label: 'Segments' },
    { icon: <ImageContainer icon={workflowIcon} />, label: 'Workflows' },
    { icon: <ImageContainer icon={integrationsIcon} />, label: 'Integrations' },
    { icon: <ImageContainer icon={settingsIcon} />, label: 'Settings' },
]

const Sidebar = ({ handleCloseClick = () => { } }) => {
    const [isWorkSpaceOpen, setWorkSpaceOpen] = useState(false)

    return (
        <nav className="mx-6">
            <div className="py-6 flex items-center justify-between">
                <h1 className="text-2xl sm:text-4xl font-bold">
                    surface<span className="bg-blue-600 text-white text-2xl sm:text-4xl px-1 mx-1 rounded">labs</span>
                </h1>
                <div className="float-right block sm:hidden" onClick={handleCloseClick}>
                    <ImageContainer icon={closeIcon} size={30} />
                </div>
            </div>
            <div className="px-2 py-3 border-b-2 border-t-2">
                <button className="cursor-pointer flex items-center justify-between w-full text-left">
                    <div className="flex items-center gap-4">
                        <ImageContainer icon={userIcon} />
                        <span>My workspace</span>
                    </div>
                    <div onClick={() => setWorkSpaceOpen(!isWorkSpaceOpen)}>
                        <ImageContainer icon={isWorkSpaceOpen ? upIcon : downIcon} />
                    </div>
                </button>
            </div>
            {isWorkSpaceOpen ? <div className="flex p-2 flex-col gap-4 transition-transform duration-300 ease-in-out transform origin-top scale-95">
                <a href="#" className="px-2 text-sm font-medium">Account</a>
                <a href="#" className="px-2 text-sm font-medium">Logout</a>
            </div> : <></>}
            <div className="border-b-2 py-2 px-1">
                <a href="#" className="text-md font-medium text-white">
                    <div className="flex bg-gray-900 p-2 rounded items-center gap-4">
                        <span className="h-4 w-4 rounded-full border-white border-2"></span>
                        <span>Getting started</span>
                    </div>
                </a>
            </div>
            {sideBarOptions.map((item, index) => (
                <a key={index} href="#" className="flex gap-4 items-center px-2 py-3 text-md font-medium text-neutral-400">
                    {item.icon}
                    <p className="font-semibold">{item.label}</p>

                </a>
            ))}
            <div className="fixed bottom-4 left-4 flex items-center gap-4">
                <img src={AVATAR} alt="avatar" className="w-9 h-9 rounded-full border" />
                <div>
                    <p className="font-medium">Chris Hood</p>
                    <p className="text-sm text-gray-500">hello@example.com</p>
                </div>
            </div>
        </nav>
    );
};

export default Sidebar;