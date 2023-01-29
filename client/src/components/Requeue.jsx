import * as React from "react";
import "./Requeue.css";
import "./Button.css";
import "./Logo.css";
import dog from "./assets/dog.png";
import speechBubble from "./assets/speechBubble.svg";
import logo from "./assets/logo.svg";

const App = () => {
  const propsData = {
    button: {
      logIn: "Requeue",
    },
    button1: {
      logIn: "Exit",
    },
  };
  return (
    <div className="requeue">
      <div className="rectangle-128">
        <img className="logo" src={logo} />
        <span className="hopefully-you-were-h">Hopefully you were helped!</span>
      </div>
      <div className="flex-container">
        <img className="image-3" src={image3} />
        <div className="flex-container-1">
          <div className="cat-absolute-container">
            <span className="woohoo">WOOHOO</span>
          </div>
          <img className="speechBubble" src={speechBubble} alt="speech bubble"/>
        </div>
      </div>
      <Button className="button-instance-1" {...propsData.button} />
      <Button className="button-1-instance" {...propsData.button1} />
    </div>
  );
};
export default Requeue;