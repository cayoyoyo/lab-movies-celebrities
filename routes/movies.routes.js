const router = require("express").Router();
const Movie = require("../models/Movie.model");


router.get("/new-movie", (req, res, next) => {
      res.render("movies/new-movie",)
    });



router.post("/new-movie", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;

  Movie.create({ title, genre, plot, cast })
    .then((movie) => {
      res.redirect("/movies");
    })
    .catch((err) => next(err));
});


router.get("/", (req, res, next) => {
  Movie.find()
    .then((movies) => {
      res.render("movies/movies", { movies });
    })
    .catch((err) => next(err));
});


router.get("/:id", (req, res, next) => {
  const { id } = req.params;

  Movie.findById(id)
    .populate("cast")
    .then((movie) => {
      res.render("movies/movie-details", { movie });
    })
    .catch((err) => next(err));
});


router.post("/:id/delete", (req, res, next) => {
  const { id } = req.params;

  Movie.findByIdAndRemove(id)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((err) => next(err));
});


router.get("/:id/edit", (req, res, next) => {
  const { id } = req.params;

  Movie.findById(id)
    .populate("cast")
    .then((movie) => {
      Celebrity.find()
        .then((celebrities) => {
          res.render("movies/edit-movie", { movie, celebrities });
        })
        .catch((error) => {
          console.log(error);
          res.redirect(`/movies/${id}`);
        });
    })
    .catch((error) => {
      console.log(error);
      res.redirect("/movies");
    });
});

router.post("/:id/edit", (req, res) => {
  const { id } = req.params;
  const { title, genre, plot, cast } = req.body;

  Movie.findByIdAndUpdate(id, { title, genre, plot, cast })
    .then(() => {
      res.redirect(`/movies/${id}`);
    })
    .catch((error) => {
      console.log(error);
      res.redirect("/movies");
    });
});


module.exports = router;