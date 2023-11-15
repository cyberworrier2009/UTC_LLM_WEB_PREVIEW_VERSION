import { useRef, useEffect } from "react";
function UseAutoResizeTextArea() {
    const textAreaRef = useRef(null);
    useEffect(() => {
        if (textAreaRef.current) {
            //    textAreaRef.current.style.height = "24px";
            //    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
    }, [textAreaRef]);
    return textAreaRef;
}
export default UseAutoResizeTextArea;
