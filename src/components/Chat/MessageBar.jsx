import { addMessages } from "@/redux/reducer/messageReducer";
import { ADD_IMAGE_ROUTE, SEND_MESSAGE_ROUTE } from "@/utils/ApiRoutes";
import axios from "axios";
import EmojiPicker from "emoji-picker-react";
import React, { useEffect, useRef, useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
import { ImAttachment } from "react-icons/im";
import { MdSend } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import PhotoPicker from "../common/PhotoPicker";
import dynamic from "next/dynamic";
const CaptureAudio = dynamic(() => import("../common/CaptureAudio"), {
  ssr: false,
});

function MessageBar() {
  const { userInfo, currentChatUser } = useSelector((state) => state.user);
  const { socket } = useSelector((state) => state.message);
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [showAudioRecorder, setShowAudioRecorder] = useState(false);
  const [graphPhoto, setGraphPhoto] = useState(false);
  const emojiRef = useRef(null);
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
  const handleEmoji = (emoji) => {
    setText((pre) => pre + emoji.emoji);
  };

  useEffect(() => {
    const handleOutSide = (event) => {
      if (!event.target.id) {
        if (emojiRef.current && !emojiRef.current.contains(event.target)) {
          setEmojiPickerOpen(false);
        }
      }
    };

    document.addEventListener("click", handleOutSide);
    return () => {
      document.removeEventListener("click", handleOutSide);
    };
  }, []);
  useEffect(() => {
    if (graphPhoto) {
      const data = document.getElementById("photo-picker");
      data.click();
      document.body.onfocus = (e) => {
        setTimeout(() => {
          setGraphPhoto(false);
        }, 1000);
      };
    }
  }, [graphPhoto]);

  const photoPickerChange = async (event) => {
    try {
      const file = await event.target.files[0];
      const formData = new FormData();
      formData.append("image", file);
      const { data } = await axios.post(ADD_IMAGE_ROUTE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: {
          from: userInfo?.id,
          to: currentChatUser?.id,
        },
      });

      socket.current.emit("send-msg", {
        from: data?.message?.senderId,
        to: data?.message?.receiverId,
        message: data?.message,
      });
      dispatch(addMessages(data?.message));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-panel-header-background h-20 mt-auto px-4 flex gap-6 items-center z-10 relative">
      {!showAudioRecorder && (
        <>
          <div className="flex gap-6">
            <BsEmojiSmile
              onClick={() => setEmojiPickerOpen(true)}
              title="Emoji"
              className="text-panel-header-icon text-xl cursor-pointer"
              id="emoji-open"
            />
            {emojiPickerOpen && (
              <div ref={emojiRef} className="absolute bottom-24 left-16">
                <EmojiPicker onEmojiClick={handleEmoji}></EmojiPicker>
              </div>
            )}

            <ImAttachment
              onClick={() => setGraphPhoto(true)}
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
              {text.length !== 0 ? (
                <MdSend
                  title="Send"
                  className="text-panel-header-icon text-xl cursor-pointer"
                  onClick={() => handleSend()}
                />
              ) : (
                <FaMicrophone
                  onClick={() => setShowAudioRecorder(!showAudioRecorder)}
                  title="Record"
                  className="text-panel-header-icon text-xl cursor-pointer"
                />
              )}
            </button>
          </div>
        </>
      )}
      {graphPhoto && <PhotoPicker onChange={photoPickerChange}></PhotoPicker>}
      {showAudioRecorder && (
        <CaptureAudio setShowAudioRecorder={setShowAudioRecorder} />
      )}
    </div>
  );
}

export default MessageBar;
