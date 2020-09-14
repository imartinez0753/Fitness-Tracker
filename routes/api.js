const router = require("express").Router();
const Workout = require("../models/workout.js");
var path = require("path");

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

router.put("/api/workouts:id", (req, res) => {
  console.log(req.body.type);
  // Workout.update(
  //   {
  //     _id: mongojs.ObjectId(req.params.id)
  //   },
  //   {
  //     $set: {
  //       type: req.body.type,
  //       name: req.body.name,
  //       duration: req.body.duration,
  //       weight: req.body.weight,
  //       reps: req.body.reps,
  //       sets: req.body.sets
  //     }
  //   },
  //   (error, data) => {
  //     if (error) {
  //       res.send(error);
  //     } else {
  //       res.send(data);
  //     }
  //   }
  // );
});

module.exports = router;
