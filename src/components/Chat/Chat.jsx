import React from "react";
import ChatHeader from "./ChatHeader";
import ChatContainer from "./ChatContainer";
import MessageBar from "./MessageBar";

function Chat() {
  return (
    <div className="border-conversation-border border-l bg-conversation-panel-background h-[100vh] z-10">
      <div className="bg-chat-background  h-[100%] w-full absolute top-0 left-0 opacity-5 z-0"></div>
      <ChatHeader />
      <ChatContainer />
      <MessageBar />
    </div>
  );
}

export default Chat;
