const router = require("express").Router();
const {
  register,
  login,
  refreshtoken,
  infor,
  logout,
} = require("../controllers/UserController");
const auth = require("../middlewares/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/refresh_token", refreshtoken);
router.get("/infor", auth, infor);

module.exports = router;
