import { setContactPage } from "@/redux/reducer/userReducer";
import { GET_ALL_CONTACTS } from "@/utils/ApiRoutes";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiArrowBack, BiSearchAlt } from "react-icons/bi";
import { useDispatch } from "react-redux";
import ChatLIstItem from "./ChatLIstItem";

function ContactsList() {
  const [allContacts, setAllContacts] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const getAllContacts = async () => {
      try {
        const { data } = await axios.get(GET_ALL_CONTACTS);
        setAllContacts(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllContacts();
  }, []);
  return (
    <div className="h-full flex flex-col ">
      <div className="h-16 flex items-end py-4 px-3">
        <div className="flex gap-12 items-center text-white">
          <BiArrowBack
            onClick={() => dispatch(setContactPage())}
            className="cursor-pointer text-xl text-panel-header-icon"
          />
          <span>New Chat</span>
        </div>
      </div>
      <div className="bg-search-input-container-background h-full flex-auto overflow-auto custom-scrollbar ">
        <div className="flex py-3 items-center gap-3 mx-4 h-14">
          <div className="bg-panel-header-background flex gap-5 items-center py-1 px-3 rounded-lg flex-grow ">
            <div>
              <BiSearchAlt className="text-panel-header-icon text-lg cursor-pointer" />
            </div>
            <div className="w-full">
              <input
                type="text"
                placeholder="Search Or Start new chat"
                className="bg-transparent text-white text-sm w-full focus:outline-none "
              />
            </div>
          </div>
        </div>

        <>
          {Object.entries(allContacts).map(([key, users]) => {
            return (
              <div className="" key={Date.now() + key}>
                <div className="text-teal-light  pl-10 py-5">{key}</div>
                {users?.map((contact) => {
                  return (
                    <ChatLIstItem
                      data={contact}
                      key={contact?.id}
                      isContactPage={true}
                    />
                  );
                })}
              </div>
            );
          })}
        </>
      </div>
    </div>
  );
}

export default ContactsList;
