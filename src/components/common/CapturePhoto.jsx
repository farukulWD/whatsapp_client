import React, { useEffect, useRef } from "react";
import Webcam from "react-webcam";

function CapturePhoto({ setImage, shoCapture, setShowCapture }) {
  const webcamRef = useRef(null);
  const videoConstraints = {
    width: 1920,
    height: 1080,
    facingMode: "user",
  };
  const capture = async () => {
    const photo = await webcamRef.current.getScreenshot();

    setImage(photo);
    setShowCapture(false);
  };
  return (
    <div className="fixed top-0 left-0 min-w-full min-h-screen  flex items-center flex-col justify-center">
      <div className="flex items-center justify-center flex-col w-[500px] rounded-2xl h-[500px] bg-gray-900 p-10">
        <div>
          <Webcam
            audio={false}
            height={1080}
            width={1920}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
        </div>
        <button
          className="w-14 h-14 mt-5 rounded-full bg-white border-8 border-green-400 "
          onClick={() => capture()}
        ></button>
      </div>
    </div>
  );
}

export default CapturePhoto;
