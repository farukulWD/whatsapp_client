import { addMessages } from "@/redux/reducer/messageReducer";
import { ADD_AUDIO_ROUTE } from "@/utils/ApiRoutes";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  FaMicrophone,
  FaPauseCircle,
  FaPlay,
  FaStop,
  FaTrash,
} from "react-icons/fa";
import { MdSend } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import WaveSurfer from "wavesurfer.js";

function CaptureAudio({ setShowAudioRecorder }) {
  const { userInfo, currentChatUser } = useSelector((state) => state.user);
  const { socket } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [waveform, setWaveForm] = useState(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [renderedAudio, setRenderedAudio] = useState(null);

  const audioRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const waveFormRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const wavesurfer = WaveSurfer.create({
      container: waveFormRef.current,
      waveColor: "#666",
      progressColor: "#27ac1f",
      cursorColor: "#27ac1f",
      barWidth: 1,
      height: 25,
      barHeight: 3,
      responsive: true,
    });

    setWaveForm(wavesurfer);

    wavesurfer.on("finish", () => {
      setIsPlaying(false);
    });

    wavesurfer.on("audioprocess", (time) => {
      setCurrentPlaybackTime(time);
    });

    return () => {
      wavesurfer.destroy();
    };
  }, []);

  // useEffect(() => {
  //   if (waveform) handleStartRecording();
  // }, [waveform]);

  const formatTime = (time) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes?.toString().padStart(2, "0")}:${seconds
      ?.toString()
      .padStart(2, "0")}`;
  };

  const handleStartRecording = () => {
    setRecordingDuration(0);
    setCurrentPlaybackTime(0);
    setTotalDuration(0);
    setIsRecording(true);

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioRef.current.srcObject = stream;

        const chunks = [];
        mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: "audio/mp3" });
          const audioUrl = URL.createObjectURL(blob);
          const audio = new Audio(audioUrl);
          setRecordedAudio(audio);
          waveform.load(audioUrl);
        };
        mediaRecorder.start();

        timerRef.current = setInterval(() => {
          setRecordingDuration((prevDuration) => prevDuration + 1);
        }, 1000);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      waveform.stop();
      clearInterval(timerRef.current);
      const audioChunks = [];
      mediaRecorderRef.current.addEventListener("dataavailable", (event) => {
        audioChunks.push(event.data);
      });
      mediaRecorderRef.current.addEventListener("stop", () => {
        let audioBlob = new Blob(audioChunks, { type: "audio/mp3" });
        const audioFile = new File([audioBlob], "recording.mp3", {
          type: "audio/mp3",
        });

        setRenderedAudio(audioFile);
      });

      const stream = audioRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  const handlePlayRecording = () => {
    if (recordedAudio) {
      waveform.play();
      setIsPlaying(true);
    }
  };

  const handlePauseRecording = () => {
    setCurrentPlaybackTime(waveform.getCurrentTime());
    waveform.pause();
    setIsPlaying(false);
  };

  useEffect(() => {
    if (recordedAudio) {
      const updatePlaybackTime = () => {
        setCurrentPlaybackTime(recordedAudio.currentTime);
      };
      recordedAudio.addEventListener("timeupdate", updatePlaybackTime);
      return () => {
        recordedAudio.removeEventListener("timeupdate", updatePlaybackTime);
      };
    }
  }, [recordedAudio]);

  const handleSendAudio = async () => {
    try {
      const formData = new FormData();
      formData.append("audio", renderedAudio);
      const { data } = await axios.post(ADD_AUDIO_ROUTE, formData, {
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
      setShowAudioRecorder(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex text-2xl justify-end items-center w-full">
      <div className="pt-1">
        <FaTrash
          className="text-panel-header-icon cursor-pointer"
          onClick={() => setShowAudioRecorder(false)}
        />
      </div>
      <div className="mx-4 py-2 text-white text-lg flex justify-center gap-3 items-center bg bg-search-input-container-background rounded-full drop-shadow-lg">
        {isRecording ? (
          <div className="text-red-500 animate-pulse w-60  text-center">
            Recording <span>{formatTime(recordingDuration)}s</span>
          </div>
        ) : (
          <div>
            {recordedAudio && (
              <>
                {!isPlaying ? (
                  <FaPlay onClick={() => handlePlayRecording()} />
                ) : (
                  <FaStop onClick={handlePauseRecording} />
                )}
              </>
            )}
          </div>
        )}

        <div className="w-60" ref={waveFormRef} hidden={isRecording} />

        {recordedAudio && isPlaying && (
          <span>{formatTime(currentPlaybackTime)}</span>
        )}
        {recordedAudio && !isPlaying && (
          <span> {formatTime(totalDuration)}</span>
        )}
        <audio ref={audioRef} hidden />

        <div className="mr-4">
          {!isRecording ? (
            <FaMicrophone
              onClick={handleStartRecording}
              className="text-red-500"
            />
          ) : (
            <FaPauseCircle
              onClick={handleStopRecording}
              className="text-red-500"
            />
          )}
        </div>
        <div>
          <MdSend
            className="text-panel-header-icon mr-4 cursor-pointer"
            onClick={handleSendAudio}
            title="Send"
          />
        </div>
      </div>
    </div>
  );
}

export default CaptureAudio;
