const express = require("express");
const ImageKit = require("imagekit");

const router = express.Router();

const imagekit = new ImageKit({
	publicKey: "public_3KUbtWkmwmFb3qiesmlr9FbNpHY=",
	privateKey: "private_vgAvkxRvEvlmtEHtqT3VKm6d6S0=",
	urlEndpoint: "https://ik.imagekit.io/psrmathur",
});

const getAuthparameters = (req, res) => {
	var authparas = imagekit.getAuthenticationParameters();
	res.send(authparas);
};

router.get("/", getAuthparameters);
module.exports = router;
