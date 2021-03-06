const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
	name: { type: String, required: true, trim: true },
	email: {
		type: String,
		unique: true,
		required: true,
		trim: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error("Invalid Email");
			}
		},
	},
	password: {
		type: String,
		required: true,
		trim: true,
		minLength: [6, "Atleast 6 character required"],
		validate(value) {
			if (value.includes("password")) {
				throw new Error("Password cannot contain Word 'password' ");
			}
		},
	},
	age: {
		type: Number,
		default: 0,
		validate(value) {
			if (value < 0) {
				throw new Error("Age should be Postitive.");
			}
		},
	},
	tokens: [
		{
			token: {
				type: String,
				required: true,
			},
		},
	],
});

userSchema.methods.generateAuthToken = async function () {
	const user = this;

	const token = jwt.sign({ _id: user._id.toString() }, "secretkey");
	user.tokens = user.tokens.concat({ token });
	await user.save();
	return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email });

	if (!user) {
		throw new Error("Email Not Registered");
	}

	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		throw new Error("Invalid Password");
	}
	return user;
};

userSchema.pre("save", async function (next) {
	const user = this;
	if (user.isModified("password")) {
		user.password = await bcrypt.hash(user.password, 8);
	}
	next();
});

const User = mongoose.model("user", userSchema);

module.exports = User;
