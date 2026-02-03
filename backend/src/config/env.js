import "dotenv/config";

if (!process.env.MONGO_URL) throw new Error("MONGO_URL missing");
if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET missing");
