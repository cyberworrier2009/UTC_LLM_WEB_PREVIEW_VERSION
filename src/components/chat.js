import { useEffect, useRef, useState } from "react";
import { FiSend } from "react-icons/fi";
import { BsChevronDown, BsPlusLg } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
//import useAnalytics from "@/hooks/useAnalytics";
import UseAutoResizeTextArea from "../hooks/use-autoresize-textarea";
import Message from "./message";
import PromptCard from "./prompt-card";
import { 
  Gallery, 
  TextInput,
  TextInputGroup,
  TextInputGroupMain,
  TextInputGroupUtilities,
  Accordion, 
  AccordionItem,
  AccordionContent, 
  AccordionToggle,
  Button
 } from "@patternfly/react-core";
import SearchIcon from '@patternfly/react-icons/dist/esm/icons/search-icon';
import { useSelector, useDispatch } from "react-redux";
import {
  chairmanPrompts,
  organizationCulturePrompts,
  hrPrompts,
  comprehensivePrompts,
  financePrompts,
} from "../prompts/prompt-message";

import Box from "@mui/joy/Box";

const Chat = (props) => {
  const { toggleComponentVisibility } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showEmptyChat, setShowEmptyChat] = useState(true);
  const [conversation, setConversation] = useState([]);
  const [message, setMessage] = useState("");
  //const { trackEvent } = useAnalytics();
  const textAreaRef = UseAutoResizeTextArea();
  const bottomOfChatRef = useRef(null);
  const { prompt, value } = useSelector((state) => state.prompt);
  const [promptCardMessages, setPromptCardMessages] = useState([]);
  const dispatch = useDispatch();
  const loadingSelect = useSelector((state) => state.loading);
  const promptMessage = useSelector(
    (state) => state.promptMessage
  );
  const [numCards, setNumCards] = useState(9);
  const handleLoadMore = () => {
    setNumCards(numCards + 3);
  };
  const showClearButton = !!message;
  const showUtilities = showClearButton;
  const showClearButtons = showClearButton;
  const handleInputChange = (_event, value) => {
    setMessage(value);
  };
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "24px";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
    setMessage(promptMessage.promptSelectMessage);
    
  }, [message, textAreaRef, promptMessage]);

  useEffect(() => {
    if (bottomOfChatRef.current) {
      bottomOfChatRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation]);

  useEffect(() => {
    if (prompt) {
      console.log("prompt ", prompt);
      if (value === 1) {
        setConversation([]);
        setPromptCardMessages(chairmanPrompts);
      }
      else if (value === 2) {
        setConversation([]);
        setPromptCardMessages(hrPrompts);
      } 
      else if (value === 3) {
        setConversation([]);
        setPromptCardMessages(organizationCulturePrompts);
      }
      else if (value === 4) {
        setConversation([]);
        setPromptCardMessages(financePrompts);
      } 
      else if (value === 5) {
        setConversation([]);
        setPromptCardMessages(comprehensivePrompts);
      } else {
        setConversation([]);
        setPromptCardMessages([]);
      }
    }
    setNumCards(9);
  }, [prompt]);

  const sendMessage = async (e) => {
    console.log("message ", message);
    e.preventDefault();
    dispatch({type:"promptSelect/message", payload:""})
    //Add the message to the conversation

    //  setConversation([

    //   ...conversation,
    //   { content: message,
    //     role: "user"
    //   },
    //   {
    //     "role": "assistant",
    //     "content": "\n\nHello there, how may I assist you today?",
    //   }
    // ]);
    // setConversation({
    //   "id": "chatcmpl-123",
    //   "object": "chat.completion",
    //   "created": 1677652288,
    //   "model": "gpt-3.5-turbo-0613",
    //   "choices": [{
    //     "index": 0,
    //     "message": {
    //       "role": "assistant",
    //       "content": "\n\nHello there, how may I assist you today?",
    //     },
    //     "finish_reason": "stop"
    //   }],
    //   "usage": {
    //     "prompt_tokens": 9,
    //     "completion_tokens": 12,
    //     "total_tokens": 21
    //   }
    // }
    // )

    // Don't send empty messages
    if (message.length < 1) {
      setErrorMessage("Please enter a message.");
      return;
    } else {
      setErrorMessage("");
    }

    //trackEvent("send.message", { message: message });
    setIsLoading(true);

    //Add the message to the conversation
    setConversation([
      ...conversation,
      { content: message, role: "user" },
      { content: "", role: "system" },
    ]);

    // Clear the message & remove empty chat
    setMessage("");
    setShowEmptyChat(false);

    try {
      const response = await fetch(`CHAT-ENGINE-URL`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: message }),
      });
      dispatch({ type: "loading/isLoading", payload: true });
      console.log("log ", response);
      if (response.ok) {
        const data = await response.json();

        // Add the message to the conversation
        setConversation([
          ...conversation,
          { content: message, role: "user" },
          { content: data.response, role: "system" },
        ]);
        dispatch({ type: "loading/isLoading", payload: false });
      } else {
        console.error(response);
        dispatch({ type: "loading/isLoading", payload: false });
        setErrorMessage(response.statusText);
      }

      setIsLoading(false);
      dispatch({ type: "loading/isLoading", payload: false });
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);

      setIsLoading(false);
    }
    // try {
    //   const data = { message, history };
    //   const responseData = response.data;
    //   const apiResponse = responseData.response;

    //   setResponse(apiResponse);
    //   setHistory([...history, { input: message, output: apiResponse }]);
    //   setMessage('');
    // } catch (error) {
    //   console.error('Error:', error);
    // }
  };

  const handleKeypress = (e) => {
    // It's triggers by pressing the enter key
    if (e.keyCode == 13 && !e.shiftKey) {
      sendMessage(e);
      e.preventDefault();
    }
  };

  const handleCardClick = (e) => {
    console.log("e ", e);
    console.log("message ", message);
  };

  return (
    // <div className="flex lg:mx-auto lg:max-w-2xl xl:max-w-3xl flex-1 flex-col">
    //   <div className="sticky top-0 z-10 flex items-center border-b border-white/20 bg-gray-800 pl-1 pt-1 text-gray-200 sm:pl-3 md:hidden">
    //     <button
    //       type="button"
    //       className="-ml-0.5 -mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white dark:hover:text-white"
    //       onClick={toggleComponentVisibility}
    //     >
    //       <span className="sr-only">Open sidebar</span>
    //       <RxHamburgerMenu className="h-6 w-6 text-white" />
    //     </button>
    //     <h1 className="flex-1 text-center text-base font-normal">New chat</h1>
    //     <button type="button" className="px-3">
    //       <BsPlusLg className="h-6 w-6" />
    //     </button>
    //   </div>
    //   <div className="relative h-full w-full transition-width flex flex-col overflow-hidden items-stretch flex-1">
    //     <div className="flex-1 overflow-hidden">
    //       <div className="react-scroll-to-bottom--css-ikyem-79elbk h-full dark:bg-gray-800">
    //         <div className="react-scroll-to-bottom--css-ikyem-1n7m0yu">
    //           {conversation.length > 0 ? (
    //             <div className="flex flex-col items-center text-sm dark:bg-gray-800">
    //               {/* <div className="flex w-full items-center justify-center gap-1 border-b border-black/10 bg-gray-50 p-3 text-gray-500 dark:border-gray-900/50 dark:bg-gray-700 dark:text-gray-300">
    //                  Model: {selectedModel.name}
    //               </div> */}
    //               {conversation.map((message, index) => (
    //                 <Message key={index} message={message} />
    //               ))}
    //               <div className="w-full md:h-48 flex-shrink-0"></div>
    //               <div ref={bottomOfChatRef}></div>
    //             </div>
    //           ) : null}
    //           {showEmptyChat ? (
    //             <div className="py-10 relative w-full flex flex-col h-full">
    //                <div className="flex items-center justify-center gap-2">
    //                 <div className="relative w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
    //                   <button
    //                     className="relative flex w-full cursor-default flex-col rounded-md border border-black/10 bg-white py-2 pl-3 pr-10 text-left focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 dark:border-white/20 dark:bg-gray-800 sm:text-sm align-center"
    //                     id="headlessui-listbox-button-:r0:"
    //                     type="button"
    //                     aria-haspopup="true"
    //                     aria-expanded="false"
    //                     data-headlessui-state=""
    //                     aria-labelledby="headlessui-listbox-label-:r1: headlessui-listbox-button-:r0:"
    //                   >
    //                     <label
    //                       className="block text-xs text-gray-700 dark:text-gray-500 text-center"
    //                       id="headlessui-listbox-label-:r1:"
    //                       data-headlessui-state=""
    //                     >
    //                       Model
    //                     </label>
    //                     <span className="inline-flex w-full truncate">
    //                       <span className="flex h-6 items-center gap-1 truncate text-white">
    //                         {/* {selectedModel.name} */}
    //                       </span>
    //                     </span>
    //                     <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
    //                       <BsChevronDown className="h-4 w-4 text-gray-400" />
    //                     </span>
    //                   </button>
    //                 </div>
    //               </div>
    //               <h1 className="text-2xl sm:text-4xl font-semibold text-center text-gray-200 dark:text-gray-600 flex gap-2 items-center justify-center h-screen">
    //                 PCI chat bot
    //               </h1>
    //             </div>
    //           ) : null}
    //           <div className="flex flex-col items-center text-sm dark:bg-gray-800"></div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="absolute bottom-0 left-0 w-full border-t md:border-t-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:bg-vert-light-gradient bg-white dark:bg-gray-800 md:!bg-transparent dark:md:bg-vert-dark-gradient pt-2">
    //       <form className="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
    //         <div className="relative flex flex-col h-full flex-1 items-stretch md:flex-col">
    //           {errorMessage ? (
    //             <div className="mb-2 md:mb-0">
    //               <div className="h-full flex ml-1 md:w-full md:m-auto md:mb-2 gap-0 md:gap-2 justify-center">
    //                 <span className="text-red-500 text-sm">{errorMessage}</span>
    //               </div>
    //             </div>
    //           ) : null}
    //           <div className="flex flex-col w-full py-2 flex-grow md:py-3 md:pl-4 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]">
    //             <textarea
    //               ref={textAreaRef}
    //               value={message}
    //               tabIndex={0}
    //               data-id="root"
    //               style={{
    //                 height: "24px",
    //                 maxHeight: "200px",
    //                 overflowY: "hidden",
    //                 outline: "none"
    //               }}
    //               rows={1}
    //               placeholder="Send a message..."
    //               className="m-0 w-full resize-none border-0 bg-transparent p-0 pr-7 focus:ring-0 focus-visible:ring-0 dark:bg-transparent pl-2 md:pl-0"
    //               onChange={(e) => setMessage(e.target.value)}
    //               onKeyDown={handleKeypress}
    //             ></textarea>
    //             <button
    //               disabled={isLoading || message?.length === 0}
    //               onClick={sendMessage}
    //               className="absolute p-1 rounded-md bottom-1.5 md:bottom-2.5  bg-gray-300 right-1 md:right-2 disabled:opacity-40"
    //             >
    //               <FiSend className="h-4 w-4 mr-1 text-white " />
    //             </button>
    //           </div>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </div>

    <div className="chat-container w-full overflow-x-auto" ref={bottomOfChatRef}>
      <div className="conversation-container">
        {conversation.length > 0 ? (
          conversation.map((message, index) => (
            <Message key={index} message={message} />
          ))
        ) : (
          <>
            {promptCardMessages.length > 0 ? (
              //   <Gallery
              //     className="grid grid-cols-4 gap-10"
              //     hasGutter
              //     style={{
              //       display: "grid",
              //       gridTemplateColumns: "repeat(4, 1fr)",
              //       gridGap: "10px",
              //        "--pf-v5-l-gallery--GridTemplateColumns--min": "50px",
              //     }}
              //   >
              // <div className="flex justify-center border border-gray-300 p-4">
              <div
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  maxWidth: 1000,
                  margin: "auto",
                  display: "grid",
                  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                  gap: 3,
                }}
              >
                {promptCardMessages.slice(0, numCards).map((card,index) => (
                  <PromptCard
                    key={index}
                    description={card}
                    onClick={handleCardClick}
                  />
                ))}
              </Box>
              {numCards < promptCardMessages.length && (
                <button style={{ position: "fixed", top: 10, right: 5 }} onClick={handleLoadMore}>Load More</button>
              )}
            </div>
            ) : (
              //</div>
              //   </Gallery>
              // </div>
              // <Gallery
              //   hasGutter
              //   style={{
              //     "--pf-v5-l-gallery--GridTemplateColumns--min": "260px",
              //   }}
              // >
              <div
                className="gallery-container"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: 1000,
                    margin: "auto",
                    display: "grid",
                    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                    gap: 3,
                  }}
                >
                  <PromptCard
                    description="Hello there, how may I assist you today?"
                    onClick={handleCardClick}
                  />
                </Box>
              </div>
              // </Gallery>
            )}
          </>
        )}
      </div>
      <div className="w-full input-container">
        {/* <TextInputGroup>
        <TextInputGroupMain icon={<SearchIcon />} value={message} onChange={(e)=>setMessage(e.target.value)} />
          {
            showUtilities && <TextInputGroupUtilities>
              {showClearButton && <Button variant="plain" onClick={sendMessage} aria-label="SendMessage">
              <FiSend />
            </Button>}
            </TextInputGroupUtilities>
          }
        </TextInputGroup> */}
        {/* <TextInputGroup>
      <TextInputGroupMain icon={<SearchIcon />} value={message} onChange={handleInputChange} />
      {showUtilities && (<TextInputGroupUtilities>
          {showClearButtons && <Button variant="plain" onClick={sendMessage} aria-label="Clear button and input">
              <FiSend />
            </Button>}
        </TextInputGroupUtilities>)}
    </TextInputGroup>; */}
    
        <TextInput
          aria-label="message=input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here"
          onKeyDown={handleKeypress}
        />
        <button
          onClick={sendMessage}
          disabled={loadingSelect === true || message?.length === 0}
          aria-label="send-message"
          className="w-20"
        >
          提交
        </button>
      </div>
    </div>
  );
};

export default Chat;
