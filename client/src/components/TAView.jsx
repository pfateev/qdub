import * as React from "react";
import "./GeneralStyle.css"
import dog from "../assets/goodDog.png";

/**
 *  Info need to GET from backend:
 *    - next student name
 *    - update # of people in the queue
 *  Info need to SEND to backend
 *    - Student has been helped, finished()
 */

export const TAView = (props) => {

  async function finished() {
    const response = await fetch('http://localhost:3001/queue', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        isTa: true
      }),
    });

    const responseData = await response.json();
    console.log(responseData);
    if(responseData.nextStudent == null) {
      props.setNextStudent("");
    } else {
      props.setNextStudent(responseData.nextStudent.name);
    }
    props.setNumberOfPeople(responseData.numberOfPeople);
  };

  return (
    <div>
      {props.numberOfPeople > 0 ?
        <div className="webpage" id="queueView">
          <div className="header">
            <span className="peopleAheadDesc">
              You’re doing great!
              The next person you should help is {props.nextStudent}
              <span className="peopleAheadDesc">
                {props.numberOfPeople} people in queue
              </span>
            </span>
          </div>
          <button className="button" type="finished" onClick={finished}>
            Next Student!
          </button>
        </div>
      :
        <div>
          <div className="webpage" id="queueView">
            <div className="header">
              <span className="noPeople">
                There are no more people in the queue 🥳
              </span>
            </div>
              <img className="dog" src={dog} alt="cute dog" />
              {/* reroute/api */}
              <button className="button" type="finished" onClick={finished}>
                End Queue!
              </button>
          </div>
        </div>
      }
    </div>
  );
};

export default TAView;