// seed.js
import bcrypt from "bcrypt"
import { User } from "./user.model.js"

const users = [
  { email: "a@test.com", password: "1234" },
  { email: "b@test.com", password: "1234" },
  { email: "c@test.com", password: "1234" },
]

for (const u of users) {
  const hash = await bcrypt.hash(u.password, 10)
  await User.create({ email: u.email, password: hash })
}
console.log("Seeding done");