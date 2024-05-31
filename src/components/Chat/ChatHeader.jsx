import React from "react";
import Avatar from "../common/Avatar";
import { MdCall } from "react-icons/md";
import { IoVideocam } from "react-icons/io5";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setSearchMessage } from "@/redux/reducer/messageReducer";

function ChatHeader() {
  const { currentChatUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <div
      className="h-16 px-4 py-3 flex justify-between items-center z-10 bg-panel-header-background"
      style={{ position: "relative", zIndex: 999 }}
    >
      <div className="flex justify-center items-center gap-6">
        <Avatar type={"sm"} image={currentChatUser?.profilePicture} />
        <div className="flex flex-col">
          <span className="text-primary-strong"> {currentChatUser?.name}</span>
          <span className="text-secondary text-sm"> online/offline</span>
        </div>
      </div>
      <div className="flex gap-6">
        <MdCall className="text-panel-header-icon text-xl cursor-pointer" />
        <IoVideocam className="text-panel-header-icon text-xl cursor-pointer" />
        <BiSearchAlt2
          onClick={() => dispatch(setSearchMessage())}
          className="text-panel-header-icon text-xl cursor-pointer"
        />
        <BsThreeDotsVertical className="text-panel-header-icon text-xl cursor-pointer" />
      </div>
    </div>
  );
}

export default ChatHeader;
