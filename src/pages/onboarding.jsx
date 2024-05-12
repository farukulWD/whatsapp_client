import Input from "@/components/common/Input";
import Image from "next/image";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaCamera } from "react-icons/fa";

function onboarding() {
  const { userInfo } = useSelector((state) => state.user);
  const [name, setName] = useState(userInfo?.name || "");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState("/default_avatar.png");

  return (
    <div className="flex h-screen w-screen flex-col justify-center items-center bg-panel-header-background">
      <div className="flex justify-center items-center">
        <Image src={"/whatsapp.gif"} alt="whatsapp" height={300} width={300} />
        <span className="text-white text-7xl">Whatsapp</span>
      </div>
      <h2 className="text-2xl text-white">Create your profile</h2>
      <div className="flex justify-center items-center gap-6">
        <div className="flex flex-col items-center justify-center mt-5 gap-6">
          <Input
            type={"text"}
            state={name}
            setState={setName}
            name={"Display Name"}
            label
          />
          <Input
            type={"text"}
            state={about}
            setState={setAbout}
            name={"About"}
            label
          />
        </div>
      </div>
    </div>
  );
}

export default onboarding;
