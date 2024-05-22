import React from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
import { ImAttachment } from "react-icons/im";
import { MdSend } from "react-icons/md";

function MessageBar() {
  return (
    <div className="bg-panel-header-background h-20 px-4 flex gap-6 items-center z-10 relative">
      <>
        <div className="flex gap-6">
          <BsEmojiSmile
            title="Emoji"
            className="text-panel-header-icon text-xl cursor-pointer"
          />
          <ImAttachment
            title="Attachment"
            className="text-panel-header-icon text-xl cursor-pointer"
          />
        </div>
        <div className="flex w-full h-10 rounded-lg items-center">
          <textarea
            type="text"
            placeholder="Type a message"
            className="bg-input-background focus:outline-none w-full text-sm text-white h-10 px-5 py-2 rounded-lg"
          />
        </div>
        <div className="w-10 items-center justify-center">
          <button>
            <MdSend
              title="Send"
              className="text-panel-header-icon text-xl cursor-pointer"
            />
            {/* <FaMicrophone
              title="Record"
              className="text-panel-header-icon text-xl cursor-pointer"
            /> */}
          </button>
        </div>
      </>
    </div>
  );
}

export default MessageBar;
