import React, { Suspense } from "react";
import { Outlet, Route, Routes, HashRouter } from "react-router-dom";
import "./contentSection.scss";

// routes config
import routes from "../routes";
import { Toaster } from "react-hot-toast";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

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
                    element={<route.component API_KEY={API_KEY} HOST_IP={HOST_IP} />}
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
