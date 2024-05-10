import React from "react";

import { motion, AnimatePresence } from "framer-motion";

import ColorPicker from "../ColorPicker/ColorPicker";
import ColorTempPicker from "../ColorTempPicker/ColorTempPicker";
import Light from "../GroupLight/GroupLight";

const color = ({ showContainer, direction, group, lights, HOST_IP, api_key, }) => {

    /*const variants = {
        enter: {
            x: "-100%",
            opacity: 0,
        },
        center: {
            zIndex: 1,
            y: 0,
            x: 0,
            opacity: 1,
            scale: 1,
            height: "auto",
        },
        exit: {
            zIndex: 0,
            x: "100%",
            opacity: 0
        }
    };*/

    const variants = {
        enter: {
            x: (direction > 0 ? "200px" : "-200px"),
            opacity: 0,
        },

        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: {
            zIndex: 0,
            x: (direction < 0 ? "-200px" : "200px"),
            opacity: 0,
        },

    };

    return (
        <motion.div className="row colorpicker">
            <AnimatePresence mode="wait" custom={direction}>
                {showContainer !== "closed" && (
                    <motion.section
                        key={showContainer}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        custom={direction}
                        variants={variants}
                        transition={{
                            x: { duration: 0.15 },
                            opacity: { duration: 0.15 },
                            ease: "easeInOut"
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
