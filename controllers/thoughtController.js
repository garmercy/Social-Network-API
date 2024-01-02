const { Thought, User } = require("../models");

const thoughtController = {
  // getAllThought gets all Thoughts
  getAllThought(req, res) {
    Thought.find({})
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // getThoughtbyId gets Thought using the id
  getThoughtbyId({ params }, res) {
    Thought.findOne({ _id: params.id })
      .then(dbThoughtData => {
          if(!dbThoughtData) {
            res.status(400).json({message: 'No thought found'});
            return;
         }
      res.json(dbThoughtData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // Creates a thought
  createThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
          return User.findOneAndUpdate(
              { username: body.username },
              { $push: { thoughts: _id } },
              { new: true }
            );
      })
      .then((dbThoughtData) => {
          if (!dbThoughtData) {
              res.status(400).json({ message: 'No thought found with this id.'});
              return;
          }
          res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },

  // Updates a thought by id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {new: true, runValidators: true,})
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "Incorrect thought, id not found" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  // Deletes a thought
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({ message: 'Unable to delete'});
            return;
        }
          res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },

  // Adding a reaction
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $addToSet: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought with this id" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // Deletes a reaction
  deleteReaction({ params}, res) {
    Thought.findOneAndUpdate(
      { _id: params.userId },
      { $push: { reactions: params.reactionId }},
      { new: true }
    )
    .then(dbReactionsData => res.json(dbReactionsData))
    .catch(err => res.json(err));
  },
};

module.exports = thoughtController;