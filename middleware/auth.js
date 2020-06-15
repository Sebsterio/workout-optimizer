import jwt from "jsonwebtoken";

// convert token into userId
export default (req, res, next) => {
	const token = req.header("x-auth-token");
	if (!token)
		return res.status(401).json({ msg: "Missing auth token. Please sign in." });

	try {
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
		req.userId = decodedToken.userId;
		next();
	} catch (e) {
		res.status(401).json({ msg: "Invalid auth token" });
	}
};
