import { useState } from "react";
import { useMediaQuery } from "react-responsive";

import ContentSection from "./ContentSection";
import SidebarSection from "./SidebarSection";
import HeaderSection from "./HeaderSection";

import "./layout.scss";
import "./scrollbar.scss";

const Layout = ({ HOST_IP, API_KEY }) => {
  const isMobile = useMediaQuery({ query: `(max-width: 750px)` });
  const [showSidebar, setShowSidebar] = useState(!isMobile);

  return (
    <>
      <SidebarSection
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        isMobile={isMobile}
      />

      <div className="columnRight">
        <HeaderSection
          HOST_IP={HOST_IP}
          API_KEY={API_KEY}
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />
        <ContentSection
          HOST_IP={HOST_IP}
          API_KEY={API_KEY}
        />
      </div>
    </>
  );
};

export default Layout;
