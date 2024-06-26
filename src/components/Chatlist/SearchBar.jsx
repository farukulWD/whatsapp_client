import { setContactSearch } from "@/redux/reducer/userReducer";
import React from "react";
import { BiSearchAlt } from "react-icons/bi";
import { BsFilter } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

function SearchBar() {
  const { contactSearch } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <div className="bg-search-input-container-background flex py-3 pl-5 items-center h-14 z-10 gap-3">
      <div className="bg-panel-header-background flex gap-5 items-center py-1 px-3 rounded-lg flex-grow ">
        <div>
          <BiSearchAlt className="text-panel-header-icon text-lg cursor-pointer" />
        </div>
        <div className="w-full">
          <input
            type="text"
            placeholder="Search Or Start new chat"
            className="bg-transparent text-white text-sm w-full focus:outline-none "
            value={contactSearch}
            onChange={(e) => {
              dispatch(setContactSearch(e.target.value));
            }}
          />
        </div>
      </div>
      <div className="pr-5 pl-3">
        <BsFilter className="text-panel-header-icon text-lg cursor-pointer" />
      </div>
    </div>
  );
}

export default SearchBar;
