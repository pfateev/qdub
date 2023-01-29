import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import "./App.css";
import RegistrationForm from "./components/RegistrationForm";
import StudentView from "./components/StudentView";
// import TAView from "./components/TAView";
// import Requee from "./components/Requeue";

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<RegistrationForm/>}/>
          <Route path="/student-view" element={<StudentView/>}/>
        </Routes>
    </Router>
  );
}


// const App = () => {
//   return (
//     <div>
//       {/* <RegistrationForm /> */}
//       <StudentView />
//     </div>
//   );
// };

export default App;
