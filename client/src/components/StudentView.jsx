import * as React from "react";
import * as api from "../api/index.js"
import "./StudentView.css";
import "./Button.css";
import "./Logo.css";
import "./TalkingDog.css";
import logo from "../assets/logo.svg";
import speechBubble from "../assets/speechBubble.svg";
import dog from "../assets/dog.png";

const StudentView = ( {studentID} ) => {
  const [queueSize, setQueueSize] = React.useState('');
  const [waitTime, setWaitTime] = React.useState('');

    async function update() {
        const response = await fetch('/formtest', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            queueSize: queueSize,
            waitTime: waitTime
          }),

        });

        const responseData = await response.json();
        // passing the studentID of the student
        // console.log(studentID);
        setQueueSize(responseData.queueSize);
        setWaitTime(responseData.waitTime);
    };

    // update queue info on timed intervals
    update();
    setInterval(update, 10000);

    return (
        <div className="view">
            <div className="header">
              {/* <img className="logo" src={logo} alt="top left circles" /> */}
              <span className="peopleAheadDesc">
                    The number of people ahead of you
              </span>
              <div>
              <span className="peopleAheadNum">
                {queueSize}
              </span>
              </div>
              <span className="estimate">
                We estimate a wait time of
              </span>
              <span className="waitTime">
                {waitTime} minutes
              </span>
            </div>

            <div className="imageSet">
              <span className="speechMsg">Please Wait!</span>
              <img className="dog" src={dog} alt="cute dog" />
            </div>
            <button className="button" type="submit" >Leave Queue</button>
        </div>
    );
};
export default StudentView;