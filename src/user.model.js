const mongoose = require("mongoose");
const validator = require("validator");

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
});

const User = mongoose.model("user", userSchema);

module.exports = User;
