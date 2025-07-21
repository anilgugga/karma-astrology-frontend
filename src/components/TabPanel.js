import { motion, AnimatePresence } from "framer-motion";

const variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export default function TabPanel({ activeKey, children }) {
  return (
    <div className="relative min-h-[200px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeKey}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.3 }}
          className="absolute w-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
