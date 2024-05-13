import Image from "next/image";
import React, { useState } from "react";
import { FaCamera } from "react-icons/fa";

function Avatar({ type, image }) {
  const [hover, setHover] = useState(false);
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuCoordinates, setContextMenuCoordinates] = useState({
    x: 0,
    y: 0,
  });
  const shoContextMenu = (e) => {
    e.preventDefault();
    setContextMenuCoordinates({ x: e.pageX, y: e.pageY });
    setContextMenuVisible(true);
  };

  return (
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
                hover ? "visible" : "hidden"
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
              className={`flex flex-col gap-2 absolute w-28 h-28 left-0 top-0 bg-photopicker-overlay-background rounded-full z-10 justify-center items-center text-white ${
                hover ? "visible" : "hidden"
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
            <div className="w-28 h-28">
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
              className={`flex flex-col gap-2 absolute w-60 h-60 left-0 top-0 bg-photopicker-overlay-background rounded-full z-10 justify-center items-center text-white ${
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
            <div className="w-60 h-60">
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
    </div>
  );
}

export default Avatar;
