import { useEffect, useState } from "react";
import { useLoadingStore } from "@/store/loading";
import { motion, AnimatePresence } from "framer-motion";
import Gandalf from "@/shared/assets/gendalf.png";

import "./styles.scss";

export const Loader = () => {
  const isLoading = useLoadingStore((state) => state.isLoading);
  const [isVisible, setIsVisible] = useState(false);
  const [timer, setTimer] = useState<number | null>(null);

  useEffect(() => {
    if (isLoading) {
      setIsVisible(true);
      if (timer) {
        clearTimeout(timer);
      }
    } else if (isVisible) {
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 1000);
      setTimer(timeout);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isLoading, isVisible]);
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className='loader-overlay'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className='loader-container'>
            <motion.img
              src={Gandalf}
              alt='Wizard Loading'
              className='loader-gandalf'
              animate={{ x: [0, 208], y: [0, -10, 0, -8, 0] }}
              transition={{
                x: { duration: 2, repeat: Infinity, ease: "linear" },
                y: { duration: 1, repeat: Infinity, ease: "easeInOut" },
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
