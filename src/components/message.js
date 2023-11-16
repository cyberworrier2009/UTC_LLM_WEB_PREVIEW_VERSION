import { SiOpenai } from "react-icons/si";
import { HiUser } from "react-icons/hi";
import { TbCursorText } from "react-icons/tb";
import { FaThumbsUp, FaThumbsDown, FaCopy, FaEdit } from "react-icons/fa";
import { useState } from "react";
import { LikeModal } from "./like-modal";
import { 
  useSelector, 
  useDispatch 
} from "react-redux";
import logo from "../picLogo.png";
// import LikeModel from './LikeModal';

const Message = (props) => {
  const { message } = props;
  const [modalShow, setModalShow] = useState(false);
  const feedbackToggle = useSelector(state => state.control.feedbackOpen);
  const dispatch = useDispatch();
  console.log("Data ", message);
  const { role, content: text } = message;

  const isUser = role === "user";
  const handleFeedbackToggle=()=>{
    setModalShow(!feedbackToggle);
    dispatch({type:"control/toggleFeedback", payload: modalShow})
  }

  return (
    <div
      className={`group w-full text-white dark:text-gray-100 border-b border-black/10 dark:border-gray-900/50 ${
        isUser ? "bg-[#3C3F42]" : "bg-[#212427] dark:bg-[#444654]"
      }`}
    >
      <div className="text-base gap-4 md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl flex lg:px-0 m-auto w-full">
        <div className="flex flex-row gap-4 md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl p-4 md:py-6 lg:px-0 m-auto w-full">
          <div className="w-8 flex flex-col relative items-end">
            <div className="relative h-7 w-7 p-1 rounded-sm text-white flex items-center justify-center bg-black/75 text-opacity-100r">
              {isUser ? (
                <HiUser className="h-4 w-4 text-white" />
              ) : (
                // <SiOpenai className="h-4 w-4 text-white" />
                <img src={logo} className="h-4 w-4 text-white" alt="logo" />
              )}
            </div>
            <div className="text-xs flex items-center justify-center gap-1 absolute left-0 top-2 -ml-4 -translate-x-full group-hover:visible !invisible">
              <button
                disabled
                className="text-gray-300 dark:text-gray-400"
              ></button>
              <span className="flex-grow flex-shrink-0">1 / 1</span>
              <button
                disabled
                className="text-gray-300 dark:text-gray-400"
              ></button>
            </div>
          </div>
          <div className="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
            <div className="flex flex-grow flex-row gap-3 justify-between">
              <div className="min-h-20 flex flex-col items-start gap-4 break-words">
                <div className="markdown prose w-full break-words dark:prose-invert dark">
                  {!isUser && text === null ? (
                    <TbCursorText className="h-6 w-6 animate-pulse" />
                  ) : (
                    <p>{text}</p>
                  )}
                </div>
              </div>
              {isUser ? (
                <div className="text-gray-200">
                  <FaEdit className="h-4 w-4  hover:text-gray-600" />{" "}
                  {/* Edit icon */}
                </div>
              ) : (
                <div className="text-gray-200 flex items-center" style={{ gap: '7px' }}>
                  <div className="h-4 w-4 inline  hover:text-gray-600" style={{ marginBottom: '7px' }}>
                  <FaThumbsUp  onClick={() => handleFeedbackToggle()}/>
                  {/* <LikeModel show={modalShow} onHide={() => setModalShow(false)}/> */}
                  <LikeModal show={modalShow} header="Send feebaack" subTitle="Feedback will help us to train the model." onHide={() => setModalShow(false)} />

                  </div>
                  <div className="h-4 w-4 inline  hover:text-gray-600"><FaThumbsDown  /></div>
                  <div className="h-4 w-4 inline  hover:text-gray-600 mb-1"><FaCopy  /></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
