import express from "express";
import cors from "cors";

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

// GET request to get the list of users
app.get("/users", (req, res) => {
  res.json({ users_list });
});

// POST request to add a new user
app.post("/users", (req, res) => {
  const newUser = req.body;
  newUser.id = Math.floor(Math.random() * 10000); // Generate a random ID for the user
  users_list.push(newUser);
  res.status(201).json(newUser); // Respond with 201 status and the new user
});

// DELETE request to delete a user by ID
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const userIndex = users_list.findIndex((user) => user.id === Number(id));
  if (userIndex > -1) {
    users_list.splice(userIndex, 1);
    res.status(204).send(); // 204: No content
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
