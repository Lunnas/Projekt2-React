import React from "react";

function Input({ getAmount }) {
  return (
    <input
      onInput={(e) => getAmount(e.target.value)}
      type="number"
      id="number"
      placeholder="0"></input>
  );
}

export default Input;
