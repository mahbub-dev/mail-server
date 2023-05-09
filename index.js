const express = require("express");
const nodemailer = require("nodemailer");
const env = require("dotenv");
const cors = require("cors");
env.config();
const app = express();
app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
app.post("/sendmail", async (req, res) => {
	try {
		const { email } = req.body;
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.MAIL,
				pass: process.env.MAILPASS,
			},
		});

		const mailOption = {
			from: "Company Name",
			to: email,
			subject: "Subscription",
			text: "You have successfuly subscribed ",
		};

		await transporter.sendMail(mailOption);
		res.status(200).json({
			success: "success",
			message: "Congratulation! You have successfuly subscribed",
		});
	} catch (error) {
		res.send({ success: "error", message: error.message });
	}
});

app.listen(process.env.PORT || 5000, (err, info) => {
	if (err) throw new Error();
	console.log(`server is running on port ${process.env.PORT || "5000"}`);
});
