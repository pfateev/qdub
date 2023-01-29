import * as React from "react";
import * as api from "../api/index.js"
import "./StudentView.css";
import "./Button.css";
import "./Logo.css";
import "./TalkingDog.css";
import logo from "../assets/logo.svg";
import speechBubble from "../assets/speechBubble.svg";
import dog from "../assets/dog.png";

const StudentView = () => {
    const propsData = {
        button: {
            logIn: "Leave Queue",
        },
    };
    /*
    Data from the backend:
     number of people ahead of you
     estimated wait time
   Data to send to backend:
     studentID?
    */
    // async function handleClick() {
    //     await api.submitForm({studentID: studentID}, "");
    // }
    return (
        <div className="studentView">
            <div className="header">
              {/* <img className="logo" src={logo} alt="top left circles" /> */}
              <span className="peopleAheadDesc">
                    The number of people ahead of you
              </span>
              <div>
              <span className="peopleAheadNum">16</span>
              </div>
              <span className="waitTime">
                We estimate a wait time of 32 minutes
              </span>
            </div>

            <div className="imageSet">
              <span className="speechMsg">Please Wait!</span>
              <img className="dog" src={dog} alt="cute dog" />
              <button class="button" type="submit" >Leave Queue</button>
            </div>
        </div>
    );
};
export default StudentView;