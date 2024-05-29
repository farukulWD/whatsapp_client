import React, { useEffect, useRef, useState } from "react";
import ChatList from "./Chatlist/ChatList";
import Empty from "./Empty";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { CHECK_USER_ROUTE, GET_MESSAGE_ROUTE, HOST } from "@/utils/ApiRoutes";
import { setNewUser, setUserInfo } from "@/redux/reducer/userReducer";
import { useRouter } from "next/router";
import Chat from "./Chat/Chat";
import { io } from "socket.io-client";
import {
  addMessages,
  setMessages,
  setSocket,
} from "@/redux/reducer/messageReducer";

function Main() {
  const { userInfo, currentChatUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [redirectLogin, setRedirectLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [socketEvent, setSocketEvent] = useState(false);
  const router = useRouter();
  const socket = useRef(null);

  useEffect(() => {
    if (redirectLogin) {
      router.push("/login");
    }
  }, [redirectLogin]);

  onAuthStateChanged(firebaseAuth, async (currentUser) => {
    console.log(currentUser);
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

  useEffect(() => {
    const getMessages = async () => {
      try {
        const { data } = await axios.get(
          `${GET_MESSAGE_ROUTE}/${userInfo?.id}/${currentChatUser?.id}`
        );

        if (data) {
          dispatch(setMessages(data?.messages));
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (currentChatUser) {
      getMessages();
    }
  }, [currentChatUser]);

  useEffect(() => {
    if (userInfo && !socket.current) {
      socket.current = io(HOST);
      socket.current.emit("add-user", userInfo?.id);
      dispatch(setSocket(socket));
    }
  }, [userInfo]);

  useEffect(() => {
    if (socket.current && !socketEvent) {
      socket.current.on("msg-receive", (data) => {
        dispatch(addMessages(data?.message));
      });
      setSocketEvent(true);
    }
  }, [socket.current]);

  return (
    <>
      <div className="grid grid-cols-main w-full h-screen max-h-screen max-w-full overflow-hidden">
        <ChatList isLoading={isLoading} />

        {currentChatUser ? <Chat /> : <Empty />}
      </div>
    </>
  );
}

export default Main;
