import React from "react";

import { motion, AnimatePresence } from "framer-motion";

import ColorPicker from "../ColorPicker/ColorPicker";
import ColorTempPicker from "../ColorTempPicker/ColorTempPicker";
import Light from "../GroupLight/GroupLight";

const color = ({
    showContainer,
    group,
    lights,
    HOST_IP,
    api_key,
}) => {
    return (
        <motion.div className="row colorpicker">
            <AnimatePresence initial={false} mode="wait">
                {showContainer !== "closed" && (
                    <motion.section
                        key={showContainer}
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: {
                                opacity: 1,
                                scale: 1,
                                height: "auto",
                            },
                            collapsed: {
                                opacity: 0,
                                height: 0,
                            },
                        }}
                        transition={{
                            duration: 0.3,
                        }}
                    >
                        {showContainer === "colorTempPicker" && (
                            <ColorTempPicker
                                group={group}
                                lights={lights}
                                HOST_IP={HOST_IP}
                                api_key={api_key}
                            />
                        )}
                        {showContainer === "colorPicker" && (
                            <ColorPicker
                                group={group}
                                lights={lights}
                                HOST_IP={HOST_IP}
                                api_key={api_key}
                                groupLights={group.lights}
                            />
                        )}
                        {showContainer === "lights" && (
                            group.lights.map((light) => (
                                <Light
                                    HOST_IP={HOST_IP}
                                    api_key={api_key}
                                    key={light}
                                    id={light}
                                    light={lights[light]}
                                />
                            ))
                        )}
                    </motion.section>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default color;
