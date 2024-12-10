import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).send("You are not authenticated!");

    jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
        if (err) return res.status(403).send("Access denied!");

        // Attach the user ID and role to the request object for further use
        req.userId = payload.id;
        req.isSeller = payload.isSeller;

        // Call next() to proceed to the next middleware or route handler
        next();
    });
};
