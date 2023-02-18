import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import StudentView from "./components/StudentView";
import TAView from "./components/TAView";
import Login from "./components/Login";
import StudentCourse from "./components/StudentCourse";
import TACourse from "./components/TACourse";
import Home from "./components/Home";

const App = () => {
  const [netID, setNetID] = useState(null);
  const [isTA, setIsTA] = useState(false);
  const [nextStudent, setNextStudent] = useState(null);
  const [numberOfPeople, setNumberOfPeople] = useState();
  const [estimatedWait, setEstimatedWait] = useState(0);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Login
              setNetID={setNetID}
              setIsTa={setIsTA}
              setNextStudent={setNextStudent}
              setNumberOfPeople={setNumberOfPeople}
              setEstimatedWait={setEstimatedWait}
            />
          }
        />
        <Route
          path="/student-view"
          element={
            <StudentView
              netID={netID}
              isTA={isTA}
              numberOfPeople={numberOfPeople}
              estimatedWait={estimatedWait}
            />
          }
        />
        <Route
          path="/ta-view"
          element={
            <TAView
              netID={netID}
              isTA={isTA}
              nextStudent={nextStudent}
              numberOfPeople={numberOfPeople}
              estimatedWait={estimatedWait}
              setNextStudent={setNextStudent}
              setNumberOfPeople={setNumberOfPeople}
              setEstimatedWait={setEstimatedWait}
            />
          }
        />
        <Route path="/student-courses" element={<StudentCourse/>}/>
        <Route path="/ta-courses" element={<TACourse/>}/>
      </Routes>
    </Router>
  );
};

export default App;
