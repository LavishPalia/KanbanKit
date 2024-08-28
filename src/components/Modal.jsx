import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // If the modal is not open, return null

  return (
    <AnimatePresence>
      <motion.div
        className="px-1 md:px-0 fixed inset-0 bg-gray-900/50 flex justify-center items-center z-10"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <motion.div
          className="text-white bg-black p-2 md:p-8 max-w-4xl w-full shadow-xl relative rounded-lg"
          onClick={(e) => e.stopPropagation()}
          initial={{ y: "100vh" }}
          animate={{ y: 0 }}
          exit={{ y: "100vh" }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 300,
            duration: 0.4,
          }}
        >
          <button
            className="absolute top-2.5 right-2.5 p-2 bg-none border-none text-2xl cursor-pointer"
            onClick={onClose}
          >
            &times;
          </button>
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;
