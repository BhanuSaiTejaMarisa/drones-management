const router = require("express").Router();
const { signIn, logIn, verifyEmail, forgotPassword, resetPassword } = require("../controllers/authController");

router.post("/signin", signIn);
router.post("/login", logIn);
router.put("/verify-email", verifyEmail)
router.put("/forgot-password/:email", forgotPassword);
router.put("/reset-password/:passwordResetCode", resetPassword)

module.exports = router;
