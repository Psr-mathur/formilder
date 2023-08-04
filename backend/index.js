const ResponseRoute = require("./routes/response");
const CreateRoute = require("./routes/createform");
const UploadikRoute = require("./routes/authik");
const TaskResproute = require("./routes/taskresponse");
const TaskRoute = require("./routes/createtask").router;
const cors = require("cors");
const express = require("express");

const mongoose = require("mongoose");
const app = express();

const uri =
	"mongodb+srv://psr_mathur:12345@formilder.fvxlbut.mongodb.net/formilder?retryWrites=true&w=majority";

mongoose
	.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => app.listen(4000, () => console.log("On port 4000 with db.")))
	.catch((err) => console.log(err));

app.use((req, res, next) => {
	// res.header("Access-Control-Allow-Credentials", true);
	res.setHeader("Access-Control-Allow-Credentials", true);
	next();
});
const UI_URL = "http://localhost:5173";
// const UI_URL = "https://formilder.onrender.com";
app.use(
	cors({
		origin: UI_URL,
		credentials: true,
	})
);
app.use(express.json());

app.use("/api/authimagekit", UploadikRoute);
app.use("/api/response", ResponseRoute);
app.use("/api/createform", CreateRoute);
app.use("/api/createtask", TaskRoute);
app.use("/api/taskresponse", TaskResproute);
