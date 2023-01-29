import { useState, useEffect } from 'react';
import logo from "../assets/logo.svg";
import "./RegistrationForm.css";
import "./Button.css";
import "./Logo.css";
import * as api from "../api/index.js"

export default function MyForm() {

  const [isFetching, setIsFetching] = useState(false);
  const [json, setJson] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isTA, setIsTA] = useState(false);

  useEffect(() => {
    if (isFetching) {
      fetch("/formtest", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          isTA: isTA
        }),
      })
        .then(response => {
          console.log(response);
          response.json();
        })
        .then(json => {
          setJson(json);
        })
        .catch(error => {
          console.error(error);
        })
        .finally(() => setIsFetching(false));
    }
  });


  const handleClick = () => {
    // await api.submitForm(
    //   ({
    //     firstName: firstName,
    //     lastName: lastName,
    //     isTA: isTA
    //   }), "/formtest")
    //   .then(response => {
    //     if (response.ok) {
    //       console.log(response);
    //       return response;
    //     }
    //     throw response;
    //   })
    //   .then(data => console.log(data))
    //   .catch(error => {
    //     console.error(error);
    //   })
    fetch("/formtest", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        isTA: isTA
      }),
    })
      .then(response => {
        console.log(response);
        response.json();
      })
      .then(json => {
        console.log(json);
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <div className="registration">
      <img className="logo" src={logo} alt="top left circles" />
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
        <input class="checkBox" type="checkbox" onChange={() => setIsTA(!isTA)} /> Are you a TA?
      </label>
      <button class="button" type="submit"
        onClick={() => setIsFetching(true)}>
        Sign up!
      </button>
    </div>
  );
}