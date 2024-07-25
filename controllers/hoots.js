const express = require("express")
const verifyToken = require("../middleware/verify-token.js")
const Hoot = require("../models/hoot.js")
const router = express.Router()

// ========== Public Routes ===========

// ========= Protected Routes =========

router.use(verifyToken)

// because this is a POST route, we want only someone who has gone through auth to be able to do this so it has to go under middleware for verifying the token
router.post("/", async (req, res) => {
  try {
    req.body.author = req.user._id
    const hoot = await Hoot.create(req.body)
    hoot._doc.author = req.user
    res.status(201).json(hoot)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})
// same with this route
router.get("/", async (req, res) => {
  try {
    // the find method will look for ALL instances of that model if you provide the find() method with an empty object
    const hoots = await Hoot.find({})
      .populate("author")
      .sort({ createdAt: "desc" })
    res.status(200).json(hoots)
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
