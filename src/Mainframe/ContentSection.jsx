import React, { Suspense } from "react";
import { Outlet, Route, Routes, HashRouter } from "react-router-dom";

import { Toaster } from "react-hot-toast";

import routes from "../routes";

import "./contentSection.scss";
import loading from "../components/Loader/Loader";

const ContentSection = ({ HOST_IP, API_KEY }) => {
  return (
    <div className="content">
      <Toaster position="top-right" />
      <Suspense fallback={loading}>
        <HashRouter>
          <Routes>
            {routes.map((route, idx) => {
              return (
                route.component && (
                  <Route
                    key={idx}
                    path={route.path}
                    element={
                      <route.component API_KEY={API_KEY} HOST_IP={HOST_IP} />
                    }
                  />
                )
              );
            })}
            <Route path="/" element={<Outlet />} />
          </Routes>
        </HashRouter>
      </Suspense>
    </div>
  );
};

export default ContentSection;
