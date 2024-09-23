"use client";
import React, { useEffect, useState } from 'react';
import ImageContainer from './ImageContainer';
import Sidebar from './Sidebar';
import menuIcon from "../../assets/Icons/menu.svg"
import InstallTag from './InstallTag';
import OuterCard from './OuterCard';
import TestTag from './TestTag';
import { CARDS_DATA } from '~/constants';

interface TagItemInterface {
  value: string,
  title: string,
  text: string,
  buttonText: string,
  styles?: string,
}
const Onboarding = () => {
  const [showSidebar, setShowSidebar] = useState(false)
  const [showStep, setShowStep] = useState("")
  const [connectionStatus, setConnectionStatus] = useState<boolean | null>(null)

  const handleShowSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  useEffect(() => {
    const status = localStorage.getItem("script_connected");
    if (status) {
      setConnectionStatus(Boolean(status))
    }
  }, [])

  const handleStep = (value: string) => {
    if (!connectionStatus && value === "test") {
      return
    } else if (value === showStep) {
      return setShowStep("")
    }
    setShowStep(value)
  }

  return (
    <div className="flex h-screen bg-white">
      <div className="hidden sm:block w-64 md:w-80 bg-gray-50 border-r rounded-r-lg shadow ">
        <Sidebar />
      </div>
      <main className="flex-1 overflow-y-auto">
        {/* Mobile sidebar */}
        {showSidebar ?
          <div className="fixed sm:hidden right-0 bg-white w-full h-full z-10 transition-transform duration-300 ease-in-out transform origin-top scale-95">
            <Sidebar handleCloseClick={handleShowSidebar} />
          </div> : <></>}
        <div className="w-full p-8">
          <div className="sm:hidden float-left" onClick={handleShowSidebar}>
            <ImageContainer icon={menuIcon} size={30} /></div>
          <h2 className="text-3xl font-bold pb-6 mb-4 border-b-2 text-center sm:text-start">Getting started</h2>
          {CARDS_DATA.map((item: TagItemInterface) => (
            <OuterCard
              key={item.value}
              children={showStep === "install" ? <InstallTag connectionStatus={connectionStatus} setConnectionStatus={setConnectionStatus} handleStep={handleStep} /> : <TestTag />}
              connectionStatus={connectionStatus}
              showStep={showStep}
              handleStep={handleStep}
              {...item} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Onboarding;