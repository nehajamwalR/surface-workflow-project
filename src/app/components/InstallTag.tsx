import React, { useState } from 'react';
import ImageContainer from './ImageContainer';

import warningBlueIcon from "../../assets/Icons/warningBlue.svg"
import warningRedIcon from "../../assets/Icons/warningRed.svg"
import checkGreenIcon from "../../assets/Icons/checkGreen.svg"
import { SITE_ID, SCRIPT } from '~/constants';
import { toast } from 'react-toastify';

import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';

interface InstallTagInterface {
  connectionStatus: boolean | null;
  setConnectionStatus: Function
  handleStep: Function
}

const InstallTag = ({ connectionStatus, setConnectionStatus, handleStep }: InstallTagInterface) => {
  const [loading, setLoading] = useState(false)
  const getButtonText = () => {
    return connectionStatus === false ? "Try Again" : "Test Connection";
  };

  const copyToClipboard = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      toast.success("Code copied to clipboard!")
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  const handleCopyCode = () => {
    copyToClipboard(SCRIPT);
  }

  const handleTestConnection = async (event: Event) => {
    try {
      setLoading(true)
      const html = await fetch("/index.html");
      const textHtml = await html.text();

      const parser = new DOMParser();
      const doc = parser.parseFromString(textHtml, 'text/html');

      const surfaceScript = doc.querySelectorAll('script')[0];
      if (surfaceScript && (surfaceScript.src.includes("surface_analytics.js") || textHtml.indexOf(SITE_ID) > 0)) {
        const res = await fetch("/api/test-connection?" + new URLSearchParams({ siteId: SITE_ID }))
        const resJson = await res.json()
        setConnectionStatus(resJson.success)
        if(resJson.success){
          localStorage.setItem("script_connected", Boolean(resJson.success))
          toast.success("Success: Connected Successfully")
        }else{
          toast.error("Error: Not able to connect")
        }
      }
    } catch (err) {
      console.error("error while test connection");
      setConnectionStatus(false)
    }
    setLoading(false)
  }

  return (
    <div className='flex flex-col'>
      <div className="relative border m-4 rounded-lg">
        <Editor
          value={SCRIPT}
          highlight={(code: string) => highlight(code, languages.js)}
          padding={10}
          disabled
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
          }}
        />
        <button
          onClick={handleCopyCode}
          className="cursor-pointer absolute top-0 sm:top-2 right-2 bg-blue-600 text-white p-3 m-3 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors duration-200 flex items-center"
        >
          Copy Snippet
        </button>
      </div>
      <div className="relative">
        {loading &&
          <div className="bg-blue-50 rounded-lg flex items-center gap-2 px-4 py-2 m-4">
            <ImageContainer icon={warningBlueIcon} size={20} />
            <span>Checking for Tag...</span>
          </div>}

        {
          !!connectionStatus === true &&
          <div className="bg-green-50 rounded-lg flex items-center gap-2 px-4 py-2 m-4">
            <ImageContainer icon={checkGreenIcon} size={20} />
            <span>Connected successfully</span>
          </div>
        }
        {connectionStatus === false &&
          <div className="flex items-center gap-4 bg-red-100 text-gray-600 rounded px-4 py-2 m-4">
            <ImageContainer icon={warningRedIcon} />
            <div className="flex flex-col">
              <p className="text-xl">We couldn’t detect the Surface Tag on your website. Please ensure the snippet is added correctly. </p>
              <ul className="list-disc pl-4">
                <li>Recheck the code snippet to ensure it's correctly placed before the closing {`</head>`} tag</li>
                <li>Ensure there are no blockers (like ad blockers) preventing the script from running.</li>
                <li>Try again once you’ve made the corrections.</li>
              </ul>
            </div>
          </div>
        }
      </div>
      {connectionStatus === null &&
        <button className={`cursor-pointer self-end p-3 m-3 rounded-md ${loading ? "bg-gray-300 text-gray-700" : "bg-blue-600 text-white"}`} onClick={handleTestConnection}>{getButtonText()}</button>}
      {connectionStatus === true &&
        <button className={`cursor-pointer self-end p-3 m-3 rounded-md  bg-blue-600 text-white`} onClick={() => handleStep("test")}>Next Step</button>}
    </div>
  );
};

export default InstallTag;