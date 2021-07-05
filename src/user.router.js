const express = require("express");
const User = require("./user.model.js");

const router = express.Router();

router.post("/users/signup", async (req, res) => {
	try {
		const user = new User(req.body);
		await user.save();
		res.status(201).send(user);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.post("/users/login", (req, res) => {
	res.send("Login Endpoint");
});

router.post("/users/Logout", (req, res) => {
	res.send("Logout Endpoint");
});

router.post("/users/logoutAll", (req, res) => {
	res.send("Logout All Endpoint");
});

module.exports = router;
