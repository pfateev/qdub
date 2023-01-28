import { useState } from 'react';

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
    <div>
      <label>
        First Name: <input value={firstName} onChange={e => setFirstName(e.target.value)} />
      </label>
      <label>
        Last Name: <input value={lastName} onChange={e => setLastName(e.target.value)} />
      </label>
      <label>
        Are you a TA?: <input type="checkbox" name="isTA" />
      </label>
      <button type="submit" onClick={submitForm}>Submit</button>
    </div>
  );
}