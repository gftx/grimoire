import { useLoadingStore } from "@/store/loading";
import { useAuthStore } from "@/store/auth";
import { motion, AnimatePresence } from "framer-motion";
import Gandalf from "@/shared/assets/gendalf.png";

import "./styles.scss";

export const Loader = () => {
  const isLoading = useLoadingStore((state) => state.isLoading);
  const isRefreshing = useAuthStore((state) => state.isRefreshing);

  return (
    <AnimatePresence>
      {isLoading || isRefreshing && (
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
