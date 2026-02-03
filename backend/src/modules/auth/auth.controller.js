// auth.controller.js
import { loginUser } from "./auth.service.js"

export const login = async (req, res) => {
  const result = await loginUser(req.body)
  res.json(result)
}
