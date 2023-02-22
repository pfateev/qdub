import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import StudentView from "./components/StudentView";
import TaView from "./components/TaView";
import Login from "./components/Login";
import StudentCourse from "./components/StudentCourse";
import TaCourse from "./components/TaCourse";
import Home from "./components/Home";

const App = () => {
  const [netID, setNetID] = useState(null);
  const [isTa, setIsTa] = useState(false);
  const [studentCourses, setStudentCourses] = useState([]);
  const [taCourses, setTaCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(-1);
  const [nextStudent, setNextStudent] = useState(null);
  const [numberOfPeople, setNumberOfPeople] = useState();
  const [estimatedWait, setEstimatedWait] = useState(0);


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
                setNetID={setNetID}
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
                netID={netID}
                selectedCourse={selectedCourse}
                isTa={isTa}
                numberOfPeople={numberOfPeople}
                estimatedWait={estimatedWait}
              />
            }
          />
          <Route
            path="/ta-view"
            element={
              <TaView
                netID={netID}
                isTa={isTa}
                nextStudent={nextStudent}
                numberOfPeople={numberOfPeople}
                estimatedWait={estimatedWait}
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
                netID={netID}
                studentCourses={studentCourses}
                setSelectedCourse={setSelectedCourse}
              />
            }
          />
          <Route
            path="/ta-courses"
            element={
              <TaCourse
                netID={netID}
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
