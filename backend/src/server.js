import express from "express";
import path from "path";
import { connectDB } from "./database/db.js";
import ENV from "./lib/utils/env.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

const app = express();
const __dirname = path.resolve();

const PORT = ENV.PORT || 5000;

app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

//make ready for deployment
if(ENV.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")));

  app.get("*",(_,res)=>{
    res.sendFile(path.resolve(__dirname,"../frontend","dist","index.html")); // serve index.html for any other route -> we can write together: ../frontend/dist/index.html
  });
};

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
  connectDB();
});