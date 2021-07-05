const express = require("express");
const User = require("./user.model.js");

const router = express.Router();

router.post("/users/signup", async (req, res) => {
	try {
		const user = new User(req.body);
		await user.save();
		const token = await user.generateAuthToken();
		res.status(201).send(user);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.post("/users/login", async (req, res) => {
	try {
		const user = await User.findByCredentials(
			req.body.email,
			req.body.password
		);

		const token = await user.generateAuthToken();
		res.send({ user, token });
	} catch (e) {
		res.status(500).send(e);
	}
});

router.post("/users/Logout", (req, res) => {
	res.send("Logout Endpoint");
});

router.post("/users/logoutAll", (req, res) => {
	res.send("Logout All Endpoint");
});

module.exports = router;
