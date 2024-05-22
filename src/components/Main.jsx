import React, { useEffect, useState } from "react";
import ChatList from "./Chatlist/ChatList";
import Empty from "./Empty";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { CHECK_USER_ROUTE } from "@/utils/ApiRoutes";
import { setNewUser, setUserInfo } from "@/redux/reducer/userReducer";
import { useRouter } from "next/router";
import Chat from "./Chat/Chat";

function Main() {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [redirectLogin, setRedirectLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (redirectLogin) {
      router.push("/login");
    }
  }, [redirectLogin]);

  onAuthStateChanged(firebaseAuth, async (currentUser) => {
    if (!currentUser) setRedirectLogin(true);
    if (!userInfo && currentUser) {
      setIsLoading(true);
      const { data } = await axios.post(CHECK_USER_ROUTE, {
        email: currentUser?.email,
      });
      if (!data?.status) {
        router.push("/login");
      }
      const { id, name, email, profilePicture, about } = data?.data;
      const userData = { name, email, profilePicture, status: about, id };
      dispatch(setNewUser(false));
      dispatch(setUserInfo(userData));
      setIsLoading(false);
    }
  });

  return (
    <>
      <div className="grid grid-cols-main w-full h-screen max-h-screen max-w-full overflow-hidden">
        <ChatList isLoading={isLoading} />
        {/* <Empty /> */}
        <Chat />
      </div>
    </>
  );
}

export default Main;
