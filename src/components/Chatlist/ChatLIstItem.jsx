import React from "react";
import Avatar from "../common/Avatar";
import { useDispatch, useSelector } from "react-redux";
import {
  setContactPage,
  setCurrentChatUser,
} from "@/redux/reducer/userReducer";

function ChatLIstItem({ data, isContactPage = false }) {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleContactClick = () => {
    dispatch(setCurrentChatUser(data));
    dispatch(setContactPage());
  };

  return (
    <div
      className={`flex items-center cursor-pointer hover:bg-background-default-hover`}
      onClick={() => handleContactClick()}
    >
      <div className="min-w-fit px-5 pt-3 pb-1">
        <Avatar type={"lg"} image={data?.profilePicture}></Avatar>
      </div>
      <div className="flex min-h-full flex-col justify-center pt-3 pr-2 w-full">
        <div className="flex justify-between">
          <div>
            <span className="text-white">{data?.name}</span>
          </div>
        </div>
        <div className="flex border-b border-conversation-border pb-2 pt-1 pr-2 ">
          <div className="flex justify-between w-full">
            <span className="text-secondary line-clamp-1 text-sm">
              {data?.about || "\u00A0"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatLIstItem;
