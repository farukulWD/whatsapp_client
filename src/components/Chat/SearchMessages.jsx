import { setSearchMessage } from "@/redux/reducer/messageReducer";
import React, { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

function SearchMessages() {
  const { messages } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMessages, setFilterMessages] = useState([]);

  useEffect(() => {
    const getMessages = messages?.filter(
      (message) =>
        message.type === "text" &&
        message.message.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilterMessages(getMessages);
  }, [searchTerm]);

  return (
    <div className="bg-conversation-panel-background flex flex-col border-conversation-border  w-full border-l z-10 max-h-screen">
      <div className="h-16 px-4 py-5 flex bg-panel-header-background gap-3 items-center text-primary-strong">
        <IoClose
          className="cursor-pointer text-icon-lighter text-2xl"
          onClick={() => dispatch(setSearchMessage())}
        />
        <span>Search Messages</span>
      </div>
      <div className="overflow-auto custom-scrollbar h-full">
        <div className="flex items-center flex-col w-full">
          <div className="flex px-5 items-center gap-3 h-14 w-full">
            <div className="bg-panel-header-background flex gap-5 items-center py-1 px-3 rounded-lg flex-grow ">
              <div>
                <BiSearchAlt className="text-panel-header-icon text-lg cursor-pointer" />
              </div>
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Search Message"
                  className="bg-transparent text-white text-sm w-full focus:outline-none "
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchMessages;
