import React from "react";

function ChatContainer() {
  return (
    <div className="h-[85vh] w-full relative flex-grow overflow-auto custom-scrollbar z-10">
      <div className="bg-chat-background bg-fixed h-full w-full absolute top-0 left-0 opacity-5 z-0"></div>
      <div className="flex w-full">
        <div className="flex justify-end flex-col w-full overflow-auto gap-1"></div>
      </div>
    </div>
  );
}

export default ChatContainer;
