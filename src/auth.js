const jwt = require("jsonwebtoken");
const User = require("./user.model.js");

const Auth = async (req, res, next) => {
	try {
		const token = req.header("Authorization").replace("Bearer ", "");
		const decoded = jwt.verify(token, "secretkey");
		const user = await User.findOne({
			_id: decoded._id,
			"tokens.token": token,
		});

		if (!user) {
			throw new Error();
		}
		req.user = user;
		req.token = token;
		next();
	} catch (error) {
		res.status(401).send({ Error: "Please Autheticate" });
	}
};

module.exports = Auth;
