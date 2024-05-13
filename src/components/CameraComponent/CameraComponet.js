import React, { useRef, useEffect, useState } from "react";

function index() {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [imageData, setImageData] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const handleOpenCamera = () => {
    setIsCameraOpen(true);
  };

  const handleCloseCamera = () => {
    setIsCameraOpen(false);
  };

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const width = video?.videoWidth;
    const height = video?.videoHeight;

    canvas.width = width;
    canvas.height = height;

    context.drawImage(video, 0, 0, width, height);

    // Get the image data from the canvas
    const dataUrl = canvas.toDataURL("image/jpeg");
    setImageData(dataUrl);

    // Turn off the camera
    handleCloseCamera();
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  useEffect(() => {
    if (isCameraOpen) {
      // Access the user's camera stream
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then((stream) => {
            videoRef.current.srcObject = stream;
          })
          .catch((err) => {
            console.error("Error accessing camera:", err);
          });
      }
    } else {
      // Close the camera when it's not needed
      stopCamera();
    }
  }, [isCameraOpen]);

  return (
    <div>
      {!isCameraOpen && <button onClick={handleOpenCamera}>Open Camera</button>}
      {isCameraOpen && (
        <>
          <video
            ref={videoRef}
            autoPlay
            style={{ width: "100%", height: "auto" }}
          ></video>
          <br />
          <button onClick={handleCapture}>Capture</button>
          <br />
        </>
      )}
      {imageData && (
        <div>
          <h2>Captured Image</h2>
          <img src={imageData} alt="Captured" style={{ maxWidth: "100%" }} />
        </div>
      )}
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
    </div>
  );
}

export default index;
