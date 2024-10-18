// backend.js
import express from "express";
import cors from "cors";
import userServices from "./user-services.js";

const app = express();
const PORT = 8000;

let users_list = [
  { id: 1, name: "Charlie", job: "Janitor" },
  { id: 2, name: "Mac", job: "Bouncer" },
  { id: 3, name: "Dee", job: "Aspiring actress" },
  { id: 4, name: "Dennis", job: "Bartender" },
];

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// GET request to get the list of users
app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  userServices
    .getUsers(name, job)
    .then((users) => res.json({ users_list: users }))
    .catch((error) => res.status(500).json({ error: error.message }));
});

// GET user by ID
app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  userServices
    .findUserById(id)
    .then((user) => {
      if (!user) return res.status(404).send("Resource not found.");
      res.json(user);
    })
    .catch((error) => res.status(500).json({ error: error.message }));
});

// POST request to add a new user
app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userServices
    .addUser(userToAdd)
    .then((newUser) => res.status(201).json(newUser)) // Respond with 201 and the new user
    .catch((error) => res.status(400).json({ error: error.message }));
});

// DELETE request to delete a user by ID
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  userServices
    .deleteUserById(id)
    .then((result) => {
      if (!result) return res.status(404).send("Resource not found.");
      res.status(204).send(); // Respond with 204 No Content
    })
    .catch((error) => res.status(500).json({ error: error.message }));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
