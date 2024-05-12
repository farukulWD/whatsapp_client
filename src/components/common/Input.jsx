import React from "react";

function Input({ name, state, setState, label = false, type }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={name} className="text-teal-light text-lg">
          {" "}
          {name}
        </label>
      )}

      <div>
        <input
          type={type}
          value={state}
          name={name}
          onChange={(e) => setState(e.target.value)}
          className="bg-input-background text-white px-2 py-1 focus:outline-none rounded-md"
        ></input>
      </div>
    </div>
  );
}

export default Input;
