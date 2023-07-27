import axios from "axios";
import ImageKit from "imagekit-javascript";
import { BASE_URL } from "./Base";
// import "dotenv/config";

export const imagekitupload2 = async (file) => {
	const formData = new FormData();
	formData.append("file", file);
	formData.append("fileName", file.name);

	const tokens = await axios.get(`${BASE_URL}/authimagekit`);
	// console.log(tokens.data);

	formData.append("signature", tokens.data.signature);
	formData.append("token", tokens.data.token);
	formData.append("expire", tokens.data.expire);
	formData.append("publicKey", "public_3KUbtWkmwmFb3qiesmlr9FbNpHY=");

	// console.log(...formData);

	try {
		const result = await axios.post(
			"https://upload.imagekit.io/api/v1/files/upload",
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `${tokens.data.signature}`,
				},
			}
		);
		// console.log(result.data);
		return result.data.url;
	} catch (error) {
		console.log("Problem with uploading file.", error);
		throw error;
	}
};

const imagekit = new ImageKit({
	publicKey: "public_3KUbtWkmwmFb3qiesmlr9FbNpHY=",
	urlEndpoint: "https://ik.imagekit.io/psrmathur",
	authenticationEndpoint: `${BASE_URL}/authimagekit`,
});
export const imagekitupload1 = async (file) => {
	// Sync Problem.

	const uploadOptions = {
		file: file,
		fileName: file.name,
	};

	// Perform the upload
	const url = imagekit.upload(uploadOptions, async (error, result) => {
		if (error) {
			console.error("Image upload failed:", error);
		} else {
			console.log("Image uploaded successfully:", result.url);
			return await result.url;
		}
	});
	// console.log(url);
	return url;
};
