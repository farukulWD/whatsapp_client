import Input from "@/components/common/Input";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Avatar from "@/components/common/Avatar";
import axios from "axios";
import { ONBOARD_USER_ROUTE } from "@/utils/ApiRoutes";
import { setNewUser, setUserInfo } from "@/redux/reducer/userReducer";
import { useRouter } from "next/router";

function onboarding() {
  const { userInfo, newUser } = useSelector((state) => state.user);
  const [name, setName] = useState(userInfo?.name || "");
  const [isLoading, setIsLoading] = useState(false);
  const [about, setAbout] = useState("");
  const [image, setImage] = useState(
    userInfo?.profilePicture || "/default_avatar.png"
  );

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!newUser && !userInfo?.email) router.push("/login");
    if (!newUser && userInfo?.email) router.push("/");
  }, [newUser, userInfo, router]);

  const onBoardHandler = async () => {
    setIsLoading(true);
    if (validate()) {
      const email = userInfo?.email;
      try {
        const { data } = await axios.post(ONBOARD_USER_ROUTE, {
          email,
          name,
          about,
          profilePicture: image,
        });
        if (data.status) {
          const { id, name, email, profilePicture, about } = data.data;
          const user = { id, name, email, profilePicture, status: about };
          dispatch(setNewUser(false));
          dispatch(setUserInfo(user));
          setIsLoading(false);
        }
        router.push("/");
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    }
  };

  const validate = () => {
    if (name?.length < 3) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <>
      <div className="flex h-screen w-screen flex-col justify-center items-center bg-panel-header-background">
        <div className="flex justify-center items-center">
          <Image
            src={"/whatsapp.gif"}
            alt="whatsapp"
            height={300}
            width={300}
          />
          <span className="text-white text-7xl">Whatsapp</span>
        </div>
        <h2 className="text-2xl text-white mb-4">Create your profile</h2>
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

            <div className="flex items-center justify-center ">
              <button
                onClick={() => onBoardHandler()}
                className="bg-search-input-container-background gap-2 flex justify-between items-center py-4 px-5 rounded-lg text-white"
              >
                {isLoading ? "Onboarding..." : "Create Profile"}
              </button>
            </div>
          </div>
          <Avatar type={"xl"} setImage={setImage} image={image} />
        </div>
      </div>
    </>
  );
}

export default onboarding;
