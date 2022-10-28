const { createMovie, getMovies, getMoviesById, updateMovies, deleteMovie } = require("./movie.controller")
const router = require("express").Router();
const { checkAdminToken } = require("../../auth/tokenValidation");

router.post("/", checkAdminToken,createMovie);
router.get("/", checkAdminToken, getMovies);
router.get("/:id", checkAdminToken, getMoviesById);
router.patch("/:id", checkAdminToken, updateMovies);
router.delete("/:id", checkAdminToken, deleteMovie);

module.exports = router;