const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render("celebrities/celebrities", { celebrities });
    })
    .catch((err) => next(err));
});

router.get("/new-celebrity", (req, res, next) => {
  Celebrity.create()
  .then(() => {
    res.render("celebrities/new-celebrity");
  }).catch((err) => next(err));
  });

router.post("/new-celebrity", (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;
  
    Celebrity.create({ name, occupation, catchPhrase })
      .then(() => {
        res.redirect("/celebrities/celebrities");
      })
      .catch((err) => next(err));
  });


 
module.exports = router;




