import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // If the modal is not open, return null

  return (
    <div
      className="px-1 md:px-0 absolute inset-0 bg-gray-900/50 flex justify-center items-center z-10"
      onClick={onClose}
    >
      <div
        className="text-white bg-black p-2 md:p-8 max-w-4xl w-full shadow-xl relative rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2.5 right-2.5 p-2 bg-none border-none text-2xl cursor-pointer"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
