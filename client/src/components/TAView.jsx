import * as React from "react";
import "./TAView.css";
import "./Button.css";
// import shape from "./assets/shape.svg";


const TAView = () => {
  const propsData = {
    button1: {
      logIn: "BRIAN",
    },
    button: {
      logIn: "Finished?",
    },
  };
  return (
    <div className="view">
      <div className="header">
          <span className="peopleDesc">
            The number of people in queue are
          </span>
          <span className="peopleNum">6</span>
          <span className="remainingTime">
            We estimate the remaining time to be 32 minutes
          </span>
      </div>

      <div className="body">
        {/* <img className="shape" src={shape} /> */}
        <span className="cheerfulMsg">
          Hey TA! You’re doing great! The next person you should help is{" "}
        </span>
        <button class="button" type="nextStudent" >Brian</button>

        {/* the question that the current student has  */}
        {/* <Input className="input-instance-1" {...propsData.input} /> */}
        <button class="button" type="finished" >Finished!</button>
      </div>
    </div>
  );
};
export default TAView;