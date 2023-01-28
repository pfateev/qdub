import * as React from "react";
import "./App.css";
import shape from "./assets/shape.svg";
import Button from "./components/Button";
import Input from "./components/Input";
import RegistrationForm from "./components/RegistrationForm";

const App = () => {
  const [checked, setChecked] = React.useState(false);
  const handleChange = () => {
    setChecked(!checked);
  }
  

  const propsData = {
    input: {
      enterYourFullName: "First Name",
    },
    input1: {
      enterYourFullName: "Last Name",
    },
    button: {
      logIn: "Sign up!",
    },
  };

  const Checkbox = ({ label, value, onChange }) => {
    return (
      <label>
        <input type="checkbox" checked={value} onChange={onchange} />
        {label}
      </label>
    );
  };

  return (
    <div className="registration">
      <RegistrationForm />
      <img className="shape" src={shape} />
      <span className="queue-prototype">Queue prototype</span>
      <span className="manual-student-ta-enq">
        Manual student&#x2F;TA enqueue-ing for prototype
      </span>
      <form action="signup.html" method="post" id="signup">
        <div class="field">
          <label for="firstname">First Name:</label>
          <Input type="text" id="firstname" name="firstname" placeholder="Enter your first name" />
        </div>
        <div class="field">
          <label for="lastname">Last Name:</label>
          <Input type="text" id="lastname" name="lastname" placeholder="Enter your last name" />
        </div>
      </form>
      <div className="flex-container">
        <Checkbox
          label="Are you a TA?"
          checked={checked}
          onChange={handleChange}
        />
      </div>
      <Button className="button-instance-1" {...propsData.button} />
    </div>
  );
};
export default App;
