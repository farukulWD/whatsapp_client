import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import ContextMenu from "./ContextMenu";
import PhotoLibrary from "./PhotoLibrary";
import PhotoPicker from "./PhotoPicker";
import CapturePhoto from "./CapturePhoto";

function Avatar({ type, image, setImage, isHover = false }) {
  const [hover, setHover] = useState(false);
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuCoordinates, setContextMenuCoordinates] = useState({
    x: 0,
    y: 0,
  });
  const [showLibrary, setShowLibrary] = useState(false);
  const [graphPhoto, setGraphPhoto] = useState(false);
  const [shoCapture, setShowCapture] = useState(false);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (graphPhoto) {
        setGraphPhoto(false);
      }
    };

    if (graphPhoto) {
      const data = document.getElementById("photo-picker");
      data.click();
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [graphPhoto]);

  const shoContextMenu = (e) => {
    e.preventDefault();
    setContextMenuCoordinates({ x: e.pageX, y: e.pageY });
    setContextMenuVisible(true);
  };

  const contextMenuOptions = [
    { name: "Take Photo", callback: () => setShowCapture(true) },
    { name: "Upload Photo", callback: () => setGraphPhoto(true) },
    { name: "Upload From Library", callback: () => setShowLibrary(true) },
    { name: "Remove Photo", callback: () => setImage("/default_avatar.png") },
  ];

  const photoPickerChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    const data = document.createElement("img");
    reader.onload = function (event) {
      data.src = event.target.result;
      data.setAttribute("data-src", event.target.result);
    };
    reader.readAsDataURL(file);

    setTimeout(() => {
      setImage(data.src);
    }, 100);
  };
  return (
    <>
      <div className="flex justify-center items-center">
        {type === "sm" && (
          <>
            <div
              onMouseOver={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              className="relative cursor-pointer z-0"
            >
              <div
                className={`flex flex-col gap-2 absolute w-10 h-10 left-0 top-0 bg-photopicker-overlay-background rounded-full z-10 justify-center items-center text-white ${
                  hover && isHover ? "visible" : "hidden"
                }`}
              >
                <FaCamera
                  id="context_opener"
                  className="text-2xl text-white"
                ></FaCamera>
                <span id="context_opener">
                  Upload <br /> Profile <br /> Photo
                </span>
              </div>
              <div className="w-10 h-10">
                <Image
                  src={image}
                  alt="avatar"
                  className="rounded-full object-contain"
                  fill
                />
              </div>
            </div>
          </>
        )}
        {type === "lg" && (
          <>
            <div
              onMouseOver={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              className="relative cursor-pointer z-0"
            >
              <div
                className={`flex flex-col gap-2 absolute w-16 h-16 left-0 top-0 bg-photopicker-overlay-background rounded-full z-10 justify-center items-center text-white ${
                  hover && isHover ? "visible" : "hidden"
                }`}
              >
                <FaCamera
                  id="context_opener"
                  className="text-2xl text-white"
                ></FaCamera>
                <span id="context_opener">
                  Upload <br /> Profile <br /> Photo
                </span>
              </div>
              <div className="w-16 h-16">
                <Image
                  src={image}
                  alt="avatar"
                  className="rounded-full object-contain"
                  fill
                />
              </div>
            </div>
          </>
        )}
        {type === "xl" && (
          <>
            <div
              onMouseOver={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              className="relative cursor-pointer z-0"
            >
              <div
                id="context_opener"
                className={`flex flex-col gap-2 absolute w-52 h-52 left-0 top-0 bg-photopicker-overlay-background rounded-full z-10 justify-center items-center text-white ${
                  hover ? "visible" : "hidden"
                }`}
                onClick={(e) => shoContextMenu(e)}
              >
                <FaCamera
                  onClick={(e) => shoContextMenu(e)}
                  id="context_opener"
                  className="text-2xl text-white"
                ></FaCamera>
                <span onClick={(e) => shoContextMenu(e)} id="context_opener">
                  Upload <br /> Profile <br /> Photo
                </span>
              </div>
              <div className="w-52  h-52">
                <Image
                  src={image}
                  alt="avatar"
                  className="rounded-full  object-cover"
                  fill
                />
              </div>
            </div>
          </>
        )}
      </div>
      {contextMenuVisible && (
        <ContextMenu
          option={contextMenuOptions}
          coordinates={contextMenuCoordinates}
          contextMenu={contextMenuVisible}
          setContextMenu={setContextMenuVisible}
        ></ContextMenu>
      )}

      {graphPhoto && <PhotoPicker onChange={photoPickerChange}></PhotoPicker>}
      {shoCapture && (
        <CapturePhoto
          setImage={setImage}
          shoCapture={shoCapture}
          setShowCapture={setShowCapture}
        ></CapturePhoto>
      )}
      {showLibrary && (
        <PhotoLibrary
          setImage={setImage}
          setShowLibrary={setShowLibrary}
        ></PhotoLibrary>
      )}
    </>
  );
}

export default Avatar;
