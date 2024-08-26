import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaTrello } from "react-icons/fa";

const Header = () => {
  return (
    <div className="bg-gray-950">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0 max-w-7xl mx-auto py-8 md:py-4">
        <div className="flex gap-2 items-center justify-center">
          <FaTrello size={22} className="text-[#8F3F65]" />
          <h1 className="text-2xl font-bold">KanbanKit</h1>
        </div>

        <a href="https://github.com/LavishPalia/KanbanKit" target="_blank">
          <p className="font-medium tracking-wide">Project Code</p>
        </a>

        <div className="flex items-center gap-6">
          <a href="https://www.linkedin.com/in/lavish-palia/" target="_blank">
            <FaLinkedinIn className="hover:scale-125 transition-all hover:bg-gray-700 p-2 size-10 rounded-lg" />
          </a>
          <a href="https://github.com/LavishPalia" target="_blank">
            <FaGithub className="hover:scale-125 transition-all hover:bg-gray-700 p-2 size-10 rounded-lg" />
          </a>
          <a href="https://www.instagram.com/lavish165/" target="_blank">
            <FaInstagram className="hover:scale-125 transition-all hover:bg-gray-700 p-2 size-10 rounded-lg" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
