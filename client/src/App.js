import * as React from "react";
import "./App.css";
import rectangle132 from "./assets/rectangle132.svg";
import shape from "./assets/shape.svg";
import Button from "./components/Button";
import Input from "./components/Input";

const App = () => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        setData(data.message);
      });
  }, []);

  const propsData = {
    input: {
      enterYourFullName: "First Name\n",
    },
    input1: {
      enterYourFullName: "Last Name",
    },
    button: {
      logIn: "Log In!",
    },
  };
  return (
    <div className="registration">
      <img className="shape" src={shape} />
      <span className="queue-prototype">Queue prototype</span>
      <span className="manual-student-ta-enq">
        Manual student&#x2F;TA enqueue-ing for prototype
      </span>
      <span className="manual-student-ta-enq">
        {!data ? "Loading..." : data}
      </span>
      <Input className="input-instance-1" {...propsData.input} />
      <Input className="input-1-instance" {...propsData.input1} />
      <div className="flex-container">
        <img className="rectangle-132" src={rectangle132} />
        <span className="are-you-a-ta">Are you a TA?</span>
      </div>
      <Button className="button-instance-1" {...propsData.button} />
    </div>
  );
};
export default App;
