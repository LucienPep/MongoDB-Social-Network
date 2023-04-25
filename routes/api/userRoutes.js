const router = require('express').Router();
//gets all method functions from controller files
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/userController');

//routes without input
router.route('/').get(getUsers).post(createUser);
//routes that use a user ID to complete
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);
//friend routes that add and delete friends associated to the user by the user and friend IDs 
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);
//exports all routes
module.exports = router;
