import React from "react";
import ChatListHeader from "./ChatListHeader";
import SearchBar from "./SearchBar";
import List from "./List";

function ChatList({ isLoading }) {
  return (
    <div className="bg-panel-header-background z-10 ">
      {isLoading ? <p>Loading..</p> : <ChatListHeader />}
      <SearchBar />
      <List />
    </div>
  );
}

export default ChatList;
