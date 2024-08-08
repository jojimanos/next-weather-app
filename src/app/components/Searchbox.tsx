import React from "react";
import PropTypes from "prop-types";
import { IoSearchCircleOutline } from "react-icons/io5";
import { cn } from "../utils/cn";

type Props = {
  className: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onClick: React.FormEventHandler<HTMLFormElement> | undefined;
};

function Searchbox({ className, value, onChange, onClick }: Props) {
  return (
    <form
      onSubmit={onClick}
      className={cn(
        "flex relative items-center justify-center h-10",
        className
      )}
    >
      <input
        value={value}
        onChange={onChange}
        type="text"
        placeholder="Search location..."
        className="px-4 py-2 w-[230px] border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500 h-full"
      />
      <button
        // onClick={onClick}
        className="px-4 py-[9px] bg-blue-500 text-white rounded-r-md focus:outline-none hover:bg-blue-600 whitespace-nowrap h-full"
      >
        <IoSearchCircleOutline />
      </button>
    </form>
  );
}

export default Searchbox;
