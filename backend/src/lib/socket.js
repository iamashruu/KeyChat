import { Server } from "socket.io";
import ENV from "./utils/env.js";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer.createServer(app);

const io = new Server(server,{
    cors: {
        origin: [ENV.CLIENT_URL],
        methods: ["GET","POST"],
        credentials: true,
    },

});

// apply socket.io middleware to authenticate users

io.use(socketAuthMiddleware);