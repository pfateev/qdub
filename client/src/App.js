import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import "./App.css";
import { RegistrationForm } from "./components/RegistrationForm";
import StudentView from "./components/StudentView";
import TAView from "./components/TAView";
// import ClassSelect from "./components/ClassSelection.jsx";
// import Requeue from "./components/Requeue";
import Login from "./components/Login";
import StudentCourse from "./components/StudentCourse";
import TACourse from "./components/TACourse";

const App = () => {
  const [studentID, setStudentID] = React.useState(1);
  return (
    <Router>
        <Routes>
          <Route path="/" element={<RegistrationForm setStudentID={setStudentID}/>}/>
          <Route path="/student-view" element={<StudentView studentID={studentID}/>}/>
          <Route path="/ta-view" element={<TAView studentID={studentID}/>}/>
          {/* <Route path="/select-class" element={<ClassSelect/>}/> */}
          {/* <Route path="/requeue" element={<Requeue/>}/> */}
          <Route path="/login" element={<Login studentID={studentID}/>}/>
          <Route path="/student-course" element={<StudentCourse studentID={studentID}/>}/>
          <Route path="/ta-course" element={<TACourse studentID={studentID}/>}/>
        </Routes>
    </Router>
  );
}

export default App;
