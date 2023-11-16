import { useEffect, useState } from "react";
import Chat from "../components/chat";
//import MobileSiderbar from "../components/MobileSidebar";
import Sidebar from "../components/sidebar";
import { useSelector } from "react-redux";
//import ButtonUTC from "../components/ButtonGroup";
// import useAnalytics from "@/hooks/useAnalytics";
import  {
  Backdrop, 
  Spinner 
} from "@patternfly/react-core";

export default function MainPage() {
  const [isComponentVisible, setIsComponentVisible] = useState(false);
//   const { trackEvent } = useAnalytics();

//   useEffect(() => {
//     trackEvent("page.view", { page: "home" });
//   }, []);

  const toggleComponentVisibility = () => {
    setIsComponentVisible(!isComponentVisible);
  };
  const loading = useSelector((state) => state.loading);
useEffect(() => {
  if(localStorage.getItem("token") == null){
    window.location.href="/";
  }
},[]);
  return (
    <>
    {loading == true? (
      <Backdrop>
        <Spinner />
      </Backdrop>
    ) :(
    <main className="overflow-hidden w-full h-screen bg-[#151515] relative flex">
      {/* {isComponentVisible ? (
        <MobileSiderbar toggleComponentVisibility={toggleComponentVisibility} />
      ) : null} */}
      <div className="dark hidden flex-shrink-0 bg-[#212427] md:flex md:w-[260px] md:flex-col">
        <div className="flex h-full min-h-0 flex-col ">
          <Sidebar />
        </div>
      </div>
      <Chat toggleComponentVisibility={toggleComponentVisibility} />
    </main>
  )};
  </>
  );
}
