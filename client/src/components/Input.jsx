import * as React from "react";
import "./Input.css";
const Input = (props) => {
  return (
    <input
      className={`input ${props.className || ""}`}
      placeholder={props.enterYourFullName || "First Name\n"}
      type="text"
    />
  );
};
export default Input;
