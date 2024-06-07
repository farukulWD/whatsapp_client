import React from "react";
import Avatar from "../common/Avatar";
import { useDispatch, useSelector } from "react-redux";
import {
  setChangeCurrentChatUser,
  setContactPage,
  setCurrentChatUser,
} from "@/redux/reducer/userReducer";
import { calculateTime } from "@/utils/CalculateTime";
import MessageStatus from "../common/MessageStatus";
import { FaCamera, FaMicrophone } from "react-icons/fa";

function ChatLIstItem({ data, isContactPage = false }) {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleContactClick = () => {
    if (!isContactPage) {
      dispatch(
        setChangeCurrentChatUser({
          name: data?.name,
          about: data?.about,
          email: data?.email,
          profilePicture: data?.profilePicture,
          id:
            userInfo?.id === data?.senderId ? data?.receiverId : data?.senderId,
        })
      );
    } else {
      dispatch(setCurrentChatUser(data));
      dispatch(setContactPage());
    }
  };

  return (
    <div
      className={`flex  items-center cursor-pointer hover:bg-background-default-hover`}
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
          {!isContactPage && (
            <div>
              <span
                className={`${
                  !data?.totalUnreadMessages > 0
                    ? "text-secondary"
                    : "text-icon-green"
                }`}
              >
                {calculateTime(data?.createdAt)}
              </span>
            </div>
          )}
        </div>
        <div className="flex border-b border-conversation-border pb-2 pt-1 pr-2 ">
          <div className="flex justify-between w-full">
            <span className="text-secondary line-clamp-1 text-sm">
              {isContactPage ? (
                data?.about || "\u00A0"
              ) : (
                <div className="flex items-center gap-1 max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[200px] xl:max-w-[300px] ">
                  {data?.senderId === userInfo?.id && (
                    <MessageStatus messageStatus={data?.messageStatus} />
                  )}

                  {data?.type === "text" && (
                    <span className="truncate">{data?.message}</span>
                  )}
                  {data?.type === "audio" && (
                    <span className="flex items-center gap-1">
                      <FaMicrophone className="text-panel-header-icon" />
                      audio
                    </span>
                  )}
                  {data?.type === "image" && (
                    <span className="flex items-center gap-1">
                      <FaCamera className="text-panel-header-icon" />
                      Image
                    </span>
                  )}
                </div>
              )}
            </span>
          </div>
          {data?.totalUnreadMessages > 0 && (
            <span className="bg-icon-green px-[5px] rounded-full text-sm">
              {data?.totalUnreadMessages}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatLIstItem;
