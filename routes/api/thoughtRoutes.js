const router = require('express').Router();
//gets all method functions from controller files
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

//routes without input
router.route('/').get(getThoughts).post(createThought);
//routes that use a thought ID to complete
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought).put(updateThought);
//reaction routes that are added to the thought where the ID matches
router.route('/:thoughtId/reactions').post(addReaction);
//reaction delete method get the thought and reaction id associated
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);
//exports all routes
module.exports = router;
