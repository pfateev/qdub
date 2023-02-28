import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import StudentView from "./components/StudentView";
import TAView from "./components/TAView";
import Login from "./components/Login";
import StudentCourse from "./components/StudentCourse";
import TACourse from "./components/TACourse";
import Home from "./components/Home";
import StudentHelp from "./components/StudentHelp";

const App = () => {
  const [netId, setNetId] = useState(null);
  const [isTa, setIsTa] = useState(false);
  const [studentCourses, setStudentCourses] = useState([]);
  const [taCourses, setTaCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(-1);
  const [nextStudent, setNextStudent] = useState(null);
  const [numberOfPeople, setNumberOfPeople] = useState();
  const [estimatedWait, setEstimatedWait] = useState(0);
  // const [questions, setQuestions] = useState();


  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Home/>
            }
          />
          <Route
            path="/login"
            element={
              <Login
                setNetId={setNetId}
                setIsTa={setIsTa}
                setStudentCourses={setStudentCourses}
                setTaCourses={setTaCourses}
              />
            }
          />
          <Route
            path="/student-view"
            element={
              <StudentView
                netId={netId}
                selectedCourse={selectedCourse}
                isTa={isTa}
                numberOfPeople={numberOfPeople}
                estimatedWait={estimatedWait}
                setEstimatedWait={setEstimatedWait}
                setNumberOfPeople={setNumberOfPeople}
              />
            }
          />
          <Route
            path="/student-help"
            element={
              <StudentHelp/>
            }
          />
          <Route
            path="/ta-view"
            element={
              <TAView
                netId={netId}
                isTa={isTa}
                nextStudent={nextStudent}
                numberOfPeople={numberOfPeople}
                estimatedWait={estimatedWait}
                selectedCourse={selectedCourse}
                setNextStudent={setNextStudent}
                setNumberOfPeople={setNumberOfPeople}
                setEstimatedWait={setEstimatedWait}
              />
            }
          />
          <Route
            path="/student-courses"
            element={
              <StudentCourse
                netId={netId}
                studentCourses={studentCourses}
                setSelectedCourse={setSelectedCourse}
              />
            }
          />
          <Route
            path="/ta-courses"
            element={
              <TACourse
                netId={netId}
                taCourses={taCourses}
                setSelectedCourse={setSelectedCourse}
              />
            }
          />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
