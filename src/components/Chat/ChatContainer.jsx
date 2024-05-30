import { calculateTime } from "@/utils/CalculateTime";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import MessageStatus from "../common/MessageStatus";
import ImageMessage from "./ImageMessage";
import dynamic from "next/dynamic";
const VoiceMessage = dynamic(() => import("./VoiceMessage"), { ssr: false });

function ChatContainer() {
  const { userInfo, currentChatUser } = useSelector((state) => state.user);
  const { messages } = useSelector((state) => state.message);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={chatContainerRef}
      className="h-[85vh] w-full relative flex-grow overflow-auto custom-scrollbar z-10"
    >
      <div className="mx-10  mt-5 mb-10 bottom-0 relative left-0 z-40">
        <div className="flex w-full">
          <div className="flex justify-end flex-col w-full  gap-1">
            {messages?.map((message, index) => {
              return (
                <div
                  key={message?.id}
                  className={`flex ${
                    message?.senderId === currentChatUser?.id
                      ? "justify-start"
                      : "justify-end"
                  }`}
                >
                  {message?.type === "text" && (
                    <div
                      className={`px-2 py-[5px] text-white flex gap-2 items-end text-sm rounded-md max-w-[45%] ${
                        message?.senderId === currentChatUser?.id
                          ? "bg-incoming-background"
                          : "bg-outgoing-background"
                      }`}
                    >
                      <span style={{ maxWidth: "47ch" }} className="break-all">
                        {message?.message}
                      </span>
                      <div className="flex items-end">
                        <span className="text-bubble-meta text-[11px] pt-1 min-w-fit">
                          {calculateTime(message?.createdAt)}
                        </span>
                        <span>
                          {message?.senderId === userInfo?.id && (
                            <MessageStatus
                              messageStatus={message?.messageStatus}
                            />
                          )}
                        </span>
                      </div>
                    </div>
                  )}
                  {message?.type === "image" && (
                    <ImageMessage message={message} />
                  )}

                  {message?.type === "audio" && (
                    <VoiceMessage message={message} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatContainer;
