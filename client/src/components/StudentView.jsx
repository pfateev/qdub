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
  // const [data, setData] = React.useState(null);
  // const [loading, setLoading] = React.useState(true);
  // const [error, setError] = React.useState(null);
  const [queueSize, setQueueSize] = React.useState('');
  const [waitTime, setWaitTime] = React.useState('');

    async function update() {
      // try {
        const response = await fetch('/formtest', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }

        });
        // if (!response.ok) {
        //   throw new Error (
        //     `This is an HTTP error: The status is ${response.status}`
        //   );
        // }
        const responseData = await response.json();
        // setData(responseData);
        // setError(null);
        // console.log(responseData);
        setQueueSize(responseData.numStudents);
        setWaitTime(responseData.waitTime);
        console.log(queueSize);
        console.log(waitTime);
      // } catch(err) {
      //   setError(err.message);
      //   setData(null);
      // } finally {
      //   setLoading(false);
      // }

      // error handling goes here

    };

    update()
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
                {waitTime}
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