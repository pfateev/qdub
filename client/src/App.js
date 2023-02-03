import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import "./App.css";
import { RegistrationForm } from "./components/RegistrationForm";
import StudentView from "./components/StudentView";
import TAView from "./components/TAView";
import Requeue from "./components/Requeue";

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<RegistrationForm/>}/>
          <Route path="/student-view" element={<StudentView/>}/>
          <Route path="/ta-view" element={<TAView/>}/>
          <Route path="/requeue" element={<Requeue/>}/>
        </Routes>
    </Router>
  );
}

export default App;
