import { useEffect, useState } from "react";
import Chat from "../components/Chat";
//import MobileSiderbar from "../components/MobileSidebar";
import SideBar from "../components/Sidebar";
import ButtonUTC from "../components/ButtonGroup";
import { Sidebar } from "@patternfly/react-core";
// import useAnalytics from "@/hooks/useAnalytics";

export default function MainPage() {
  const [isComponentVisible, setIsComponentVisible] = useState(false);
//   const { trackEvent } = useAnalytics();

//   useEffect(() => {
//     trackEvent("page.view", { page: "home" });
//   }, []);

  const toggleComponentVisibility = () => {
    setIsComponentVisible(!isComponentVisible);
  };

  return (
    <main className="overflow-hidden w-full h-screen relative flex">
      {/* {isComponentVisible ? (
        <MobileSiderbar toggleComponentVisibility={toggleComponentVisibility} />
      ) : null} */}
      <div className="dark hidden flex-shrink-0 bg-[#f7f7f7] md:flex md:w-[260px] md:flex-col">
        <div className="flex h-full min-h-0 flex-col ">
          <Sidebar /> 
        </div>
      </div>
      <Chat toggleComponentVisibility={isComponentVisible} />
    </main>
  );
}
