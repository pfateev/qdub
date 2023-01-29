import * as React from "react";
import "./TAView.css";
import "./Button.css";
import shape from "./assets/shape.svg";


const App = () => {
  const propsData = {
    button1: {
      logIn: "BRIAN",
    },
    input: {
      enterYourPassword: "Brian is struggling with part 4 in the homework",
    },
    button: {
      logIn: "Finished?",
    },
  };
  return (
    <div className="ta-view">
      <img className="shape" src={shape} />
      <span className="hey-ta-youre-doing-g">
        Hey TA! You’re doing great! The next person you should help is{" "}
      </span>
      <button class="button" type="submit" >Leave Queue</button>

      {/* the question that the current student has  */}
      <Input className="input-instance-1" {...propsData.input} />
      <button class="button" type="submit" >Leave Queue</button>
      <div className="rectangle-131">
        <span className="the-number-of-people">
          The number of people in queue are
        </span>
        <span className="dsfvxsfkzjfst">6</span>
        <span className="we-estimate-a-wait-t">
          We estimate a wait time of 32 minutes
        </span>
      </div>
    </div>
  );
};
export default TAView;