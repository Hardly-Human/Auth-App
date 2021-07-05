const express = require("express");
require("./mongoose.js");

const userRouter = require("./user.router.js");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use(userRouter);

app.listen(PORT, () => console.log("Server running on port :", PORT));
