import * as React from "react";
import "./Button.css";
const Button = (props) => {
  return (
    <button className={`button ${props.className || ""}`}>
      <div className="rectangle-35">
        <span className="log-in">{props.logIn || "Log In!"}</span>
      </div>
    </button>
  );
};
export default Button;
