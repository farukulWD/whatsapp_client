import { HOST } from "@/utils/ApiRoutes";
import { calculateTime } from "@/utils/CalculateTime";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import MessageStatus from "../common/MessageStatus";

function ImageMessage({ message }) {
  const { userInfo, currentChatUser } = useSelector((state) => state.user);
  return (
    <div
      className={`p-1 rounded-lg ${
        userInfo?.id === message?.senderId
          ? "bg-outgoing-background"
          : "bg-incoming-background"
      }`}
    >
      <div className="relative">
        <Image
          src={`${HOST}/${message?.message}`}
          width={300}
          height={300}
          alt="asset"
        />
        <div className="absolute bottom-1 right-1 flex items-end gap-1">
          <span className="text-bubble-meta text-[11px] pt-1 min-w-fit">
            {calculateTime(message?.createdAt)}
          </span>
          <span>
            {message?.senderId === userInfo?.id && (
              <MessageStatus messageStatus={message?.messageStatus} />
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ImageMessage;
