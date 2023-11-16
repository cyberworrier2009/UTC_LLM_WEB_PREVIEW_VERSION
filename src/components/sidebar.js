import React, { useState } from "react";
import {
  AiOutlineMessage,
  AiOutlinePlus,
  AiOutlineUser,
  AiOutlineSetting,
} from "react-icons/ai";
import SideMenuItem from "../components/side-menu-list";
import { FiMessageSquare, FiEdit, FiTrash, FiCheck, FiX } from "react-icons/fi";
// import ButtonUTC from "./ButtonGroup";
// import Button from "react-bootstrap/Button";
import "@patternfly/elements/pf-tabs/pf-tabs.js";
import "@patternfly/elements/pf-card/pf-card.js";
import "@patternfly/react-core/dist/styles/base.css";
import { Button } from "@patternfly/react-core";
import logo from "../picLogo.png";
import logoUtc from "../logo_utc.png";
import { faUpload, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState("New conversation"); // Initial text
  // const buttons = [
  //     <Button variant="primary">Headquarters</Button>,
  //     <Button variant="secondary">Subsidiaries</Button>,
  // ];
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
  const listDepartment = [
    "党委",
    "董事长办公室",
    "人力资源部",
    "企业文化部",
    "财务资产部",
    "综合部",
    "原油单元",
    "成品油单元",
    "化工品单元",
    "天然气单元",
    "海运单元",
    "审计部",
    "法务合规部",
    "风险控制部",
    "计划与投资管理部",
    "质量健康安全环保部",
    "市场战略部",
    "信息部",
  ];
  const subsidiaries = [
    " 新加坡",
    " 美洲",
    " 伦敦",
    " 中东",
    " 哈萨克斯坦",
    " 日本",
    " 香港",
    " 中国华东",
    " 中国东北",
    " 中国西北",
    " 中国华南",
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignOut = () => {
    console.log("Sign out");
    localStorage.clear("token");
    navigate("/main-page");
    window.location.href = '/';
  };
  return (
    <div className="scrollbar-trigger flex h-full w-full flex-1 items-start border-white/20">
      <nav className="flex h-full flex-1 flex-col space-y-1 p-2">
        <div className="h-full overflow-y-auto custom-scrollbar">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={logoUtc} width={40} height={40} alt="logoUtcPic" />
            {/* <img src={logo} width={40} height={40} alt="logoPic" /> */}
          </div>

          <pf-tabs>
            <pf-tab slot="tab">总部</pf-tab>
            <pf-tab-panel>
              {listDepartment != null
                ? listDepartment.map((item, index) =>
                    item != null ? (
                      <SideMenuItem
                        key={index}
                        name={item}
                        onClick={() => {
                          const payload = {
                            prompt: item,
                            value: index,
                          };
                          dispatch({ type: "prompt/prompt", payload: payload });
                        }}
                      />
                    ) : null
                  )
                : null}
            </pf-tab-panel>
            <pf-tab slot="tab">子公司</pf-tab>
            <pf-tab-panel>
              {subsidiaries != null
                ? subsidiaries.map((item, index) =>
                    item != null ? (
                      <SideMenuItem key={index} name={item} />
                    ) : null
                  )
                : null}
            </pf-tab-panel>
          </pf-tabs>
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
            {/* <div className="relative">
              <a
                className={`flex py-3 px-3 items-center gap-3 relative rounded-md hover:bg-[#2A2B32] cursor-pointer break-all hover:pr-4 ${
                  isEditing ? "hidden" : "group"
                }`}
              >
                <FiMessageSquare className="h-4 w-4" />
                <div className="flex-1 text-ellipsis max-h-5 overflow-hidden break-all relative">
                  {inputValue}
                  <div className="absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l from-gray-900 group-hover:from-[#2A2B32]"></div>
                </div>
                <div className="hidden group-hover:flex gap-2">
                  <button
                    className="text-xl text-white rounded hover:bg-gray-700 p-1"
                    onClick={handleEditClick}
                  >
                    <FiEdit />
                  </button>
                  <button className="text-xl text-white rounded hover:bg-gray-700 p-1">
                    <FiTrash />
                  </button>
                </div>
              </a>
              {isEditing && (
                <div className="flex gap-2">
                  <input
                    className="text-xm rounded border p-1 text-dark"
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                  />
                  <button
                    className="text-xl text-white rounded hover:bg-gray-700 p-1"
                    onClick={handleSaveClick}
                  >
                    <FiCheck />
                  </button>
                  <button
                    className="text-xl text-white rounded hover:bg-gray-700 p-1"
                    onClick={handleCancelClick}
                  >
                    <FiX />
                  </button>
                </div>
              )}
            </div> */}
          </div>
        </div>
        <div className="border-t">
          {/* <Button
            aria-label="upload"
            className="space-y2 w-full"
            variant="control"
            label="Upload"
            icon={<FontAwesomeIcon icon={faUpload} />}
          >
            上传
          </Button> */}
          {/* <a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
            <AiOutlineMessage className="h-4 w-4" />
            Clear conversations
          </a>
          <a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
            <AiOutlineUser className="h-4 w-4" />
            Profile
          </a>
          <a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
            <AiOutlineSetting className="h-4 w-4" />
            Settings
          </a> */}
          {/* <a
        href="https://help.openai.com/en/collections/3742473-chatgpt"
        target="_blank"
        className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm"
      >
        <BiLinkExternal className="h-4 w-4" />
        Get help
      </a> */}
          {/* <a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm"> */}
          {/* <MdLogout className="h-4 w-4" />
            Log out */}

          {/* </a> */}
        </div>
        <div className="space-y-2 py-2 px-2">
          <FontAwesomeIcon onClick={handleSignOut} style={{ color: "white" }} icon={faSignOut} />
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
