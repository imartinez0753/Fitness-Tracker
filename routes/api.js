const router = require("express").Router();
const Workout = require("../models/workout.js");
var path = require("path");
const mongojs = require("mongojs");

router.get("/exercise?", function (req, res) {
  res.sendFile(path.join(__dirname + "/../public", "exercise.html"));
  // res.render("index", object);
});

router.get("/exercise", function (req, res) {
  res.sendFile(path.join(__dirname + "/../public", "stats.html"));
  // res.render("index", object);
});

//===========================================================

router.get("/api/workouts", (req, res) => {
  Workout.find({})
    .sort({ date: -1 })
    .then((dbWorkouts) => {
      res.json(dbWorkouts);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post("/api/workouts", ({ body }, res) => {
  Workout.create(body)
    .then((dbWorkouts) => {
      res.json(dbWorkouts);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", function ({ params, body }, res) {
  console.log(params.id);

  Workout.findByIdAndUpdate(
    params.id,
    {
      $push: {
        exercises: body
      }
    },
    { new: true, runValidators: true }
  )
    .then((dbWorkouts) => {
      res.json(dbWorkouts);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
