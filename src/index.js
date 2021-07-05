const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.post("/users/signup", (req, res) => {
	res.send("Sign up Endpoint");
});

app.post("/users/login", (req, res) => {
	res.send("Login Endpoint");
});

app.post("/users/Logout", (req, res) => {
	res.send("Logout Endpoint");
});

app.post("/users/logoutAll", (req, res) => {
	res.send("Logout All Endpoint");
});

app.listen(PORT, () => console.log("Server running on port :", PORT));
