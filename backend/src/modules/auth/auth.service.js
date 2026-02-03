// auth.service.js
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { User } from "../../models/user.model.js"

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email })
  if (!user) throw new Error("Invalid credentials")

  const ok = await bcrypt.compare(password, user.password)
  if (!ok) throw new Error("Invalid credentials")

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  )

  return {
    token,
    user: { id: user._id, email: user.email },
  }
}
