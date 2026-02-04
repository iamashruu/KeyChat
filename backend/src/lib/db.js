import mongoose from "mongoose"

export const connectDB = async () => {
  const mongoUrl = process.env.MONGO_URI 
  try {
    await mongoose.connect(mongoUrl, {
      autoIndex: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    })
    console.log("✅ MongoDB connected", mongoose.connection.host)

    const gracefulExit = async () => {
      await mongoose.connection.close()
      console.log("🔌 MongoDB connection closed")
      process.exit(0)
    }

    process.on("SIGINT", gracefulExit)
    process.on("SIGTERM", gracefulExit)
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err)
    process.exit(1)
  }

  mongoose.connection.on("error", (err) =>
    console.error("❌ MongoDB connection error:", err)
  )

  mongoose.connection.on("disconnected", () =>
    console.warn("⚠️ MongoDB disconnected")
  )
}

