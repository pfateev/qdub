import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { RegistrationForm } from "./components/RegistrationForm";
import StudentView from "./components/StudentView";
import TAView from "./components/TAView";
// import ClassSelect from "./components/ClassSelection.jsx";
// import Requeue from "./components/Requeue";

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
            <RegistrationForm
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
        {/* <Route path="/select-class" element={<ClassSelect/>}/> */}
        {/* <Route path="/requeue" element={<Requeue/>}/> */}
      </Routes>
    </Router>
  );
};

export default App;
