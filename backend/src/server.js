import express from "express";
import path from "path";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

const app = express();
const __dirname = path.resolve();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);

//make ready for deployment
if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")));

  app.get("*",(_,res)=>{
    res.sendFile(path.resolve(__dirname,"../frontend","dist","index.html")); // serve index.html for any other route -> we can write together: ../frontend/dist/index.html
  });
};

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});