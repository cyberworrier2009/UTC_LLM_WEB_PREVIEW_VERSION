import React, { useState } from "react";
import { AiOutlineMessage, AiOutlinePlus, AiOutlineUser, AiOutlineSetting, } from "react-icons/ai";
import { BiLinkExternal } from "react-icons/bi";
import { MdLogout } from "react-icons/md";
import { FiMessageSquare, FiEdit, FiTrash, FiCheck, FiX } from "react-icons/fi";
import ButtonUTC from "./ButtonGroup";
import Button from "react-bootstrap/Button";
import "@patternfly/elements/pf-tabs/pf-tabs.js";
import "@patternfly/elements/pf-card/pf-card.js";

export default function Sidebar(){
    const [isEditing, setIsEditing] = useState;
    const [inputValue, setInputValue] = useState; // Initial text
    const buttons = [
        <Button variant="primary">Headquarters</Button>,
        <Button variant="secondary">Subsidiaries</Button>,
    ];
    const handleEditClick = () => {
        setIsEditing(true);
    };
    const handleCancelClick = () => {
        setIsEditing(false);
    };
    const handleSaveClick = () => {
        // You can implement the logic to save the edited text here
        setIsEditing(false);
    };
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    return (<div className="scrollbar-trigger flex h-full w-full flex-1 items-start border-white/20">
      <nav className="flex h-full flex-1 flex-col space-y-1 p-2">
        <div className="lassName=h-4 w-4 gap-3 items-center rounded-md">
          <ButtonUTC button={buttons}/>
          <pf-tabs>
            <pf-tab slot="tab" id="tab1" aria-controls="tabpanel1" aria-selected="true" selected>Tab item 1</pf-tab>
            <pf-tab slot="tab" id="tab2" aria-controls="tabpanel1" aria-selected="true" selected>Tab item 2</pf-tab>
          </pf-tabs>
        </div>

        <div className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-rose-400 transition-colors duration-200 cursor-pointer text-sm mb-1 flex-shrink-0">
          <AiOutlinePlus className="h-4 w-4"/>
          New chat
        </div>
        <div className="flex-col flex-1 overflow-y-auto border-white/20">
          <div className="flex flex-col gap-2 pb-2 text-gray-100 text-sm">
            {/* <a className="flex py-3 px-3 items-center gap-3 relative rounded-md hover:bg-[#2A2B32] cursor-pointer break-all hover:pr-4 group">
          <FiMessageSquare className="h-4 w-4" />
          <div className="flex-1 text-ellipsis max-h-5 overflow-hidden break-all relative">
            New conversation
            <div className="absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l from-gray-900 group-hover:from-[#2A2B32]"></div>
          </div>
        </a> */}
            <div className="relative">
              <a className={`flex py-3 px-3 items-center gap-3 relative rounded-md hover:bg-[#2A2B32] cursor-pointer break-all hover:pr-4 ${isEditing ? "hidden" : "group"}`}>
                <FiMessageSquare className="h-4 w-4"/>
                <div className="flex-1 text-ellipsis max-h-5 overflow-hidden break-all relative">
                  {inputValue}
                  <div className="absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l from-gray-900 group-hover:from-[#2A2B32]"></div>
                </div>
                <div className="hidden group-hover:flex gap-2">
                  <button className="text-xl text-white rounded hover:bg-gray-700 p-1" onClick={handleEditClick}>
                    <FiEdit />
                  </button>
                  <button className="text-xl text-white rounded hover:bg-gray-700 p-1">
                    <FiTrash />
                  </button>
                </div>
              </a>
              {isEditing && (<div className="flex gap-2">
                  <input className="text-xm rounded border p-1 text-dark" type="text" value={inputValue} onChange={handleInputChange}/>
                  <button className="text-xl text-white rounded hover:bg-gray-700 p-1" onClick={handleSaveClick}>
                    <FiCheck />
                  </button>
                  <button className="text-xl text-white rounded hover:bg-gray-700 p-1" onClick={handleCancelClick}>
                    <FiX />
                  </button>
                </div>)}
            </div>
          </div>
        </div>
        <div className="border-t">
          <a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
            <AiOutlineMessage className="h-4 w-4"/>
            Clear conversations
          </a>
          <a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
            <AiOutlineUser className="h-4 w-4"/>
            Profile
          </a>
          <a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
            <AiOutlineSetting className="h-4 w-4"/>
            Settings
          </a>
          {/* <a
        href="https://help.openai.com/en/collections/3742473-chatgpt"
        target="_blank"
        className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm"
      >
        <BiLinkExternal className="h-4 w-4" />
        Get help
      </a> */}
          <a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
            <MdLogout className="h-4 w-4"/>
            Log out
          </a>
        </div>
      </nav>
    </div>);
}

