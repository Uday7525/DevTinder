
const express = require("express")
const { User } = require("../models/user")
const statusRouter = express.Router()

statusRouter.get("/status/:id", async (req, res) => {
  const user = await User.findById(req.params.id)
  res.json({
    isOnline: user.isOnline,
    lastActive: user.lastActive
  })
})

module.exports = statusRouter
