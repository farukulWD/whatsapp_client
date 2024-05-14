import Image from "next/image";
import React from "react";
import { IoClose } from "react-icons/io5";

const images = [
  "/avatars/1.png",
  "/avatars/2.png",
  "/avatars/3.png",
  "/avatars/4.png",
  "/avatars/5.png",
  "/avatars/6.png",
  "/avatars/7.png",
  "/avatars/8.png",
  "/avatars/9.png",
];

function PhotoLibrary({ setImage, setShowLibrary }) {
  return (
    <div className="fixed top-0 left-0 max-w-[100vw] max-h-[100vh] w-full h-full flex justify-center items-center ">
      <div className="h-max w-max bg-gray-900  gap-6 rounded-lg p-4">
        <div
          className="flex cursor-pointer justify-end items-end pt-2 pe-2"
          onClick={() => setShowLibrary(false)}
        >
          <IoClose className="w-10 h-10 text-white cursor-pointer" />
        </div>
        <div className="grid grid-cols-3 gap-16 justify-center items-center w-full p-20">
          {images.map((image, index) => (
            <div
              key={index}
              onClick={() => {
                setImage(images[index]), setShowLibrary(false);
              }}
            >
              <div className="h-24 w-24 rounded-full relative cursor-pointer">
                <Image src={image} alt="avatar" fill></Image>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PhotoLibrary;
