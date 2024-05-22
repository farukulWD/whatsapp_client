import React from "react";
import Avatar from "../common/Avatar";
import { useSelector } from "react-redux";
import { BsChatSquareText, BsThreeDotsVertical } from "react-icons/bs";

function ChatListHeader() {
  const { userInfo } = useSelector((state) => state.user);
  return (
    <div className="w-full h-16 flex items-center justify-between z-10 p-3">
      <div>
        <Avatar type={"sm"} image={userInfo?.profilePicture}></Avatar>
      </div>
      <div className="flex justify-between gap-10 items-center">
        <BsChatSquareText
          className="text-panel-header-icon text-xl cursor-pointer"
          title="New Chat"
        />
        <BsThreeDotsVertical
          className="text-panel-header-icon text-xl cursor-pointer"
          title="Menu"
        />
      </div>
    </div>
  );
}

export default ChatListHeader;
