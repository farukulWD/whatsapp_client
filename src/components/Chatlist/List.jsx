import { setOnlineUsers, setUserContacts } from "@/redux/reducer/userReducer";
import { GET_INITIAL_CONTACTS } from "@/utils/ApiRoutes";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatLIstItem from "./ChatLIstItem";

function List() {
  const { userInfo, userContacts, filteredContacts } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  useEffect(() => {
    const getInitialContacts = async () => {
      try {
        const {
          data: { users, onlineUsers },
        } = await axios.get(`${GET_INITIAL_CONTACTS}/${userInfo?.id}`);

        dispatch(setOnlineUsers(onlineUsers));
        dispatch(setUserContacts(users));
      } catch (error) {
        console.log(error);
      }
    };
    if (userInfo?.id) {
      getInitialContacts();
    }
  }, [userInfo]);
  return (
    <div className="flex flex-col bg-search-input-container-background flex-auto max-h-full custom-scrollbar overflow-auto h-full">
      {filteredContacts && filteredContacts?.length > 0
        ? filteredContacts?.map((contact) => {
            return <ChatLIstItem key={contact?.id} data={contact} />;
          })
        : userContacts?.map((contact) => {
            return <ChatLIstItem key={contact?.id} data={contact} />;
          })}
    </div>
  );
}

export default List;
