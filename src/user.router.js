const express = require("express");
const User = require("./user.model.js");
const auth = require("./auth.js");

const router = express.Router();

router.post("/users/signup", async (req, res) => {
	try {
		const user = new User(req.body);
		await user.save();
		const token = await user.generateAuthToken();
		res.status(201).send({ user, token });
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

router.post("/users/Logout", auth, async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter(
			(token) => token.token !== req.token
		);
		await req.user.save();
		res.send({ message: "Logout Successful" });
	} catch (error) {
		res.status(500).send(error);
	}
});

router.post("/users/logoutAll", auth, async (req, res) => {
	try {
		req.user.tokens = [];
		await req.user.save();
		res.send({ message: "Successfully Logged out of All devices" });
	} catch (error) {
		res.status(500).send(error);
	}
});

module.exports = router;
