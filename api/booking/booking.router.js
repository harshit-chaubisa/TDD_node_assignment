const { addBooking, getBooking, getBookingById, updateBooking, deleteBooking } = require("./booking.controller");
const router = require("express").Router();
const { checkUserToken } = require("../../auth/tokenValidation")

router.post("/", checkUserToken, addBooking);
router.get("/", checkUserToken, getBooking);
router.get("/:id", checkUserToken, getBookingById);
router.patch("/:id",checkUserToken, updateBooking);
router.delete("/:id",checkUserToken, deleteBooking);

module.exports = router;