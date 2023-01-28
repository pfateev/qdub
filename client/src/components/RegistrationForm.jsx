import { useState } from 'react';
import shape from "../assets/shape.svg";
import "./RegistrationForm.css";

export default function MyForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const submitForm = () => {
    fetch("/formtest", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({firstName: firstName, lastName: lastName}),
    })
  };

  return (
    <div className="registration">
      <img className="logo" src={shape} alt="top right circles"/>
      <span className="title">Queue prototype</span>
      <span className="description">
        Manual student&#x2F;TA enqueue-ing for prototype
      </span>
      <label>
        First Name: <input class="input" value={firstName} placeholder="Enter your first name" onChange={e => setFirstName(e.target.value)} />
      </label>
      <label>
        Last Name: <input class="input" value={lastName} placeholder="Enter your last name" onChange={e => setLastName(e.target.value)} />
      </label>
      <label>
        <input class="checkBox" type="checkbox" name="isTA" /> Are you a TA?
      </label>

      <button class="button" type="submit" onClick={submitForm}>Sign up!</button>
    </div>
  );
}