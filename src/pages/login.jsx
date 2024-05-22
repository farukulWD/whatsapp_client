import { setNewUser, setUserInfo } from "@/redux/reducer/userReducer";
import { CHECK_USER_ROUTE } from "@/utils/ApiRoutes";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/router";

import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";

function login() {
  const googleProvider = new GoogleAuthProvider();
  const { userInfo, newUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    if (!newUser && userInfo?.id) router.push("/");
  }, [newUser, userInfo]);
  const handleLogin = async () => {
    const {
      user: { displayName: name, email, photoURL: profilePicture },
    } = await signInWithPopup(firebaseAuth, googleProvider);
    const user = { name, email, profilePicture, status: "" };
    if (email) {
      try {
        const { data } = await axios.post(CHECK_USER_ROUTE, { email });
        if (!data.status) {
          dispatch(setNewUser(true));
          dispatch(setUserInfo(user));
          router.push("/onboarding");
        } else {
          const { id, name, email, profilePicture, about } = data.data;
          const userData = { name, email, profilePicture, status: about, id };
          dispatch(setNewUser(false));
          dispatch(setUserInfo(userData));
          router.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center bg-panel-header-background gap-6 h-screen w-screen flex-col">
      <div className="flex items-center gap-2">
        <Image src={"/whatsapp.gif"} alt="whatsapp" height={300} width={300} />
        <span className="text-7xl text-white">WhatsApp</span>
      </div>
      <button
        onClick={() => handleLogin()}
        className="bg-search-input-container-background gap-2 flex justify-between items-center py-4 px-5 rounded-lg"
      >
        <FcGoogle className="text-4xl"></FcGoogle>
        <p className="text-2xl text-white">Login with google</p>
      </button>
    </div>
  );
}

export default login;
