import React, { useEffect, useRef, useState } from "react";
import Avatar from "../common/Avatar";
import { useSelector } from "react-redux";
import WaveSurfer from "wavesurfer.js";
import { FaPause, FaPlay } from "react-icons/fa";
import { HOST } from "@/utils/ApiRoutes";
import { calculateTime } from "@/utils/CalculateTime";
import MessageStatus from "../common/MessageStatus";

const formatTime = (time) => {
  if (isNaN(time)) return "00:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

function VoiceMessage({ message }) {
  const { currentChatUser, userInfo } = useSelector((state) => state.user);

  const [isPlaying, setIsPlaying] = useState(false);
  const [audioMessage, setAudioMessage] = useState(null);
  const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const waveFormRef = useRef(null);
  const waveform = useRef(null);

  useEffect(() => {
    // Initialize WaveSurfer once
    if (waveform.current === null) {
      waveform.current = WaveSurfer.create({
        container: waveFormRef.current,
        waveColor: "#ccc",
        progressColor: "#4a9eff",
        cursorColor: "#7ae3c3",
        barWidth: 2,
        height: 30,
        responsive: true,
      });

      waveform.current.on("finish", () => {
        setIsPlaying(false);
        setCurrentPlaybackTime(0);
      });
    }

    return () => {
      waveform.current && waveform.current.destroy();
      waveform.current = null;
    };
  }, []);

  useEffect(() => {
    // Load new audio when message changes
    const audioUrl = `${HOST}/${message.message}`;
    const audio = new Audio(audioUrl);
    setAudioMessage(audio);

    waveform.current && waveform.current.load(audioUrl);
    waveform.current &&
      waveform.current.on("ready", () => {
        setTotalDuration(waveform.current.getDuration());
      });

    return () => {
      waveform.current && waveform.current.un("ready");
    };
  }, [message.message]);

  const handlePlayAudio = () => {
    if (audioMessage) {
      waveform.current && waveform.current.stop();
      waveform.current && waveform.current.play();
      audioMessage.play();
      setIsPlaying(true);
    }
  };

  const handlePauseAudio = () => {
    if (audioMessage) {
      waveform.current && waveform.current.stop();
      audioMessage.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (audioMessage) {
      const updatePlaybackTime = () => {
        setCurrentPlaybackTime(audioMessage.currentTime);
      };
      audioMessage.addEventListener("timeupdate", updatePlaybackTime);

      return () => {
        audioMessage.removeEventListener("timeupdate", updatePlaybackTime);
      };
    }
  }, [audioMessage]);

  return (
    <div
      className={`flex items-center gap-5 px-4 py-4 pr-2 text-sm rounded-md ${
        userInfo?.id === message?.senderId
          ? "bg-outgoing-background"
          : "bg-incoming-background"
      }`}
    >
      <div>
        <Avatar type={"lg"} image={currentChatUser?.profilePicture} />
      </div>
      <div className="cursor-pointer text-xl">
        {!isPlaying ? (
          <FaPlay onClick={handlePlayAudio} />
        ) : (
          <FaPause onClick={handlePauseAudio} />
        )}
      </div>
      <div className="relative">
        <div className="w-60" ref={waveFormRef} />
        <div className="text-bubble-meta flex text-[11px] pt-1 justify-between absolute bottom-[-22px] w-full">
          <span>
            {formatTime(isPlaying ? currentPlaybackTime : totalDuration)}
          </span>
          <div className="flex gap-1">
            <span>{calculateTime(message?.createdAt)}</span>
            <span>
              {message?.senderId === userInfo?.id && (
                <MessageStatus messageStatus={message?.messageStatus} />
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VoiceMessage;
