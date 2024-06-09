import { motion } from "framer-motion";

const animations = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

const PageFadein = ({ children }) => {
  return (
    <motion.div variants={animations} initial="initial" animate="animate">
      {children}
    </motion.div>
  );
};

export default PageFadein;
