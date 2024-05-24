import { addMessages } from "@/redux/reducer/messageReducer";
import { SEND_MESSAGE_ROUTE } from "@/utils/ApiRoutes";
import axios from "axios";
import React, { useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
import { ImAttachment } from "react-icons/im";
import { MdSend } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

function MessageBar() {
  const { userInfo, currentChatUser } = useSelector((state) => state.user);
  const { socket } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const handleSend = async () => {
    if (!text) {
      return alert("write something");
    }
    try {
      const { data } = await axios.post(SEND_MESSAGE_ROUTE, {
        from: userInfo?.id,
        to: currentChatUser?.id,
        message: text,
      });
      socket.current.emit("send-msg", {
        from: data?.message?.senderId,
        to: data?.message?.receiverId,
        message: data?.message,
      });
      dispatch(addMessages(data?.message));
      setText("");
    } catch (error) {
      console.log(error);
    }
  };

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
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="w-10 items-center justify-center">
          <button>
            <MdSend
              title="Send"
              className="text-panel-header-icon text-xl cursor-pointer"
              onClick={() => handleSend()}
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
