// src/Form.jsx
import React, { useState } from "react";

function Form({ handleSubmit }) {
  // State for the form's input fields
  const [person, setPerson] = useState({ name: "", job: "" });

  // Handle input change
  function handleChange(event) {
    const { name, value } = event.target;
    setPerson((prevPerson) => ({
      ...prevPerson,
      [name]: value,
    }));
  }

  // Handle form submission
  function submitForm() {
    handleSubmit(person);
    setPerson({ name: "", job: "" }); // Reset form fields
  }

  return (
    <form>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        value={person.name}
        onChange={handleChange}
      />
      <label htmlFor="job">Job</label>
      <input
        type="text"
        name="job"
        id="job"
        value={person.job}
        onChange={handleChange}
      />
      {/* Submit button triggers the submit handler */}
      <input type="button" value="Submit" onClick={submitForm} />
    </form>
  );
}

export default Form;
