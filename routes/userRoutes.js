import express from "express";
import passport from "passport";

import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

//google redirect
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

//google call back
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = generateToken(req.user._id);

    res.json({
      message: "Google login successful",
      token,
      user: req.user,
    });
  }
);

export default router;