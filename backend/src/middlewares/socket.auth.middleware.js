import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import ENV from "../lib/utils/env.js";

export const socketAuthMiddleware = async (socket, next) => {
    try {

        // extract token from http-only cookies

        const token = socket.handshake.headers.cookie
            ?.split("; ")
            ?.find((cookie) => cookie.startsWith("token="))
            ?.split("=")[1];
        
        if (!token) {
            console.log("Socket connection rejected: No token provided");
            return next(new Error("Unauthorized - Token not found"));
        }

        const decoded = jwt.verify(token, ENV.JWT_SECRET);
        if (!decoded) {
            console.log("Socket connection rejected: Invalid token");
            return next(new Error("Unauthorized - Invalid token"));
        }

        const user = await User.findById(decoded._id).select("-password");

        if (!user) {
            console.log("Socket connection rejected: User not found");
            return next(new Error("Unauthorized - User not found"));
        }
        // attach user info to socket object for later use in event handlers

        socket.user = user;
        socket.userId = user._id.toString();

        console.log(`Socket authenticated for user: ${user.fullName} (${user._id})`);
        
        next();
    } catch (error) {
        console.log("Error in socketAuthMiddleware:", error.message);
        next(new Error("Authentication error"));
    }
};