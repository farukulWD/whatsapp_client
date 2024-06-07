import { setSearchMessage } from "@/redux/reducer/messageReducer";
import { calculateTime } from "@/utils/CalculateTime";
import React, { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

function SearchMessages() {
  const { messages } = useSelector((state) => state.message);
  const { currentChatUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMessages, setFilterMessages] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      const getMessages = messages?.filter(
        (message) =>
          message.type === "text" &&
          message.message.toLowerCase().includes(searchTerm?.toLowerCase())
      );
      setFilterMessages(getMessages);
    } else {
      setFilterMessages([]);
    }
  }, [searchTerm]);

  return (
    <div className="bg-conversation-panel-background flex flex-col border-conversation-border  w-full border-l z-10 max-h-screen relative">
      <div className="h-16 px-4 py-5 flex  bg-panel-header-background gap-3 items-center text-primary-strong">
        <IoClose
          className="cursor-pointer text-icon-lighter text-2xl"
          onClick={() => dispatch(setSearchMessage())}
        />
        <span>Search Messages</span>
      </div>
      <div className="flex items-center  flex-col w-full">
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
        <span className="mt-10 text-secondary">
          {!searchTerm.length && `Search Message ${currentChatUser?.name}`}
        </span>
      </div>
      <div className="overflow-auto custom-scrollbar h-full">
        <div className="flex justify-start h-full flex-col">
          {searchTerm?.length > 0 && !filterMessages.length && (
            <span className="text-secondary w-full flex justify-center">
              No Message Found!
            </span>
          )}

          {filterMessages?.map((message) => {
            return (
              <div className="flex flex-col justify-start hover:bg-background-default-hover cursor-pointer w-full px-5 border-b-[0.1px] border-secondary py-5 ">
                <div className="text-sm text-secondary">
                  {calculateTime(message?.createdAt)}
                </div>

                <div
                  style={{ overflowWrap: "anywhere" }}
                  className="text-icon-green"
                >
                  {message?.message}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SearchMessages;
