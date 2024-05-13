import React, { useEffect, useRef } from "react";

function ContextMenu({ option, coordinates, contextMenu, setContextMenu }) {
  const contextMenuRef = useRef(null);

  const handleClick = (e, callback) => {
    e.stopPropagation();
    setContextMenu(false);
    callback();
  };

  useEffect(() => {
    const handleOutSide = (event) => {
      if (!event.target.id === "context_opener" || !event.target.id) {
        if (
          contextMenuRef.current &&
          !contextMenuRef.current.contains(event.target)
        ) {
          setContextMenu(false);
        }
      }
    };

    document.addEventListener("click", handleOutSide);
    return () => {
      document.removeEventListener("click", handleOutSide);
    };
  }, []);
  return (
    <div
      className="bg-dropdown-background fixed z-[100] py-2 shadow-xl"
      style={{ top: coordinates.y, left: coordinates.x }}
      ref={contextMenuRef}
    >
      <ul>
        {option?.map(({ name, callback }) => (
          <li
            className="hover:bg-dropdown-background-hover py-2 px-5 cursor-pointer"
            key={name}
            onClick={(e) => handleClick(e, callback)}
          >
            <span className="text-white">{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContextMenu;
