import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  // Fetch users from the backend
  function fetchUsers() {
    return fetch("http://localhost:8000/users") // Make sure this is the correct API route
      .then((res) => res.json())
      .then((json) => setCharacters(json.users_list))
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }

  // Effect to fetch users when the component first mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Update list on form submission
  function updateList(person) {
    postUser(person)
      .then((res) => res.json())
      .then((newUser) => setCharacters([...characters, newUser])) // Update with the new user returned by the backend
      .catch((error) => {
        console.error("Error posting user:", error);
      });
  }

  // Send a POST request to add a new user
  function postUser(person) {
    return fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
  }

  // Function to handle deletion of a character
  function removeOneCharacter(_id) {
    fetch(`http://localhost:8000/users/${_id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status === 204) {
          setCharacters(characters.filter((character) => character._id !== _id));
        } else {
          throw new Error("Failed to delete user");
        }
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  }

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;