const router = require("express").Router();

const {
  getAllThought,
  getThoughtbyId,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

// /api/thoughts
router
  .route("/")
  .get(getAllThought)
  .post(createThought);

// /api/thoughts:id
router
  .route("/:id")
  .get(getThoughtbyId)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router
  .route("/:thoughtId/reactions")
  .post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reaction:Id
router
  .route("/:thoughtId/reactions/:reactionId")
  .delete(deleteReaction);

module.exports = router;