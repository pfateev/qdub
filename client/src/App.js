import * as React from "react";
import "./App.css";
import RegistrationForm from "./components/RegistrationForm";
import StudentView from "./components/StudentView";
// import TAView from "./components/TAView";
// import Requee from "./components/Requeue";

const App = () => {
  return (
    <div>
      {/* <RegistrationForm /> */}
      <StudentView />
    </div>
  );
};

export default App;
