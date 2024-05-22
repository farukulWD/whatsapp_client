import ReactDOM from "react-dom";
import React from "react";

function PhotoPicker({ onChange }) {
  const component = (
    <input
      type="file"
      hidden
      name="photo"
      id="photo-picker"
      onChange={onChange}
    ></input>
  );

  return ReactDOM.createPortal(
    component,
    document.getElementById("photo-picker-element")
  );
}

export default PhotoPicker;
