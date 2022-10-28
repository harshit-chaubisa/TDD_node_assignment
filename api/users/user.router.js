const { createUser, getUserById, getUsers,updateUser,deleteUser, login } = require("./user.controller");
const router = require("express").Router();
const { checkUserToken } = require("../../auth/tokenValidation")

router.post("/", createUser);
router.get("/", checkUserToken, getUsers);
router.get("/:id", checkUserToken, getUserById);
router.patch("/:id",checkUserToken, updateUser);
router.delete("/:id",checkUserToken, deleteUser);
router.post("/login", login);
module.exports = router;