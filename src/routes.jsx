import React from "react";

const Testpage = React.lazy(() => import("./Pages/Testpage"));

const Groups = React.lazy(() => import("./Pages/Groups"));
const Lights = React.lazy(() => import("./Pages/Lights"));
const LinkButton = React.lazy(() => import("./Pages/LinkButton"));
const HA = React.lazy(() => import("./Pages/HA"));
const Mqtt = React.lazy(() => import("./Pages/Mqtt"));
const Deconz = React.lazy(() => import("./Pages/Deconz"));
const Tradfri = React.lazy(() => import("./Pages/Tradfri"));
const Alarm = React.lazy(() => import("./Pages/Alarm"));
const Devices = React.lazy(() => import("./Pages/Devices"));
const Bridge = React.lazy(() => import("./Pages/Bridge"));
const Phillips = React.lazy(() => import("./Pages/Phillips"));
const About = React.lazy(() => import("./Pages/About"));
const Settings = React.lazy(() => import("./Pages/Settings"));
const Account = React.lazy(() => import("./Pages/Account"));
const Users = React.lazy(() => import("./Pages/AppUsers"));
const Govee = React.lazy(() => import("./Pages/Govee"));

const routes = [
  { path: "/testpage", exact: true, name: "Testpage", component: Testpage },
  { path: "/", exact: true, name: "Groups", component: Groups },
  { path: "/groups", exact: true, name: "Groups", component: Groups },
  { path: "/lights", exact: true, name: "Lights", component: Lights },
  { path: "/linkbutton", exact: true, name: "LinkButton", component: LinkButton },
  { path: "/ha", exact: true, name: "HA", component: HA },
  { path: "/mqtt", exact: true, name: "MQTT", component: Mqtt },
  { path: "/deconz", exact: true, name: "Deconz", component: Deconz },
  { path: "/alarm", exact: true, name: "Alarm", component: Alarm },
  { path: "/bridge", exact: true, name: "Bridge", component: Bridge },
  { path: "/devices", exact: true, name: "Devices", component: Devices },
  { path: "/phillips", exact: true, name: "Hue Bridge", component: Phillips },
  { path: "/tradfri", exact: true, name: "Tradfri", component: Tradfri },
  { path: "/about", exact: true, name: "About", component: About },
  { path: "/settings", exact: true, name: "Settings", component: Settings },
  { path: "/account", exact: true, name: "Account", component: Account },
  { path: "/users", exact: true, name: "App Users", component: Users },
  { path: "/govee", exact: true, name: "Govee", component: Govee },
];

export default routes;
