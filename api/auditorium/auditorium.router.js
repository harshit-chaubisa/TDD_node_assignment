const { addAuditorium, getAuditoriumById, getAuditoriums, updateAuditorium, deleteAuditorium } = require("./auditorium.controller");
const router = require("express").Router();
const { checkAdminToken } = require("../../auth/tokenValidation");

router.post("/", checkAdminToken, addAuditorium);
router.get("/", checkAdminToken, getAuditoriums);
router.get("/:id", checkAdminToken, getAuditoriumById);
router.patch("/:id", checkAdminToken, updateAuditorium);
router.delete("/:id", checkAdminToken, deleteAuditorium);

module.exports = router;