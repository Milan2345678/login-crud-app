const User = require("../models/User")

// CREATE USER
exports.registerUser = async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// LOGIN USER
exports.loginUser = async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username, password })

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" })
  }

  res.status(200).json(user)
}

// GET USERS
exports.getUsers = async (req, res) => {
  const users = await User.find()
  res.json(users)
}

// UPDATE USER
exports.updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )

  res.json(user)
}

// DELETE USER
exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id)
  res.json({ message: "User deleted" })
}