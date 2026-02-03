// server.js
import "./config/env.js"
import { connectDB } from "./config/db.js"
import app from "./app.js"

await connectDB()

app.listen(3001, () => {
  console.log("Server running")
})
