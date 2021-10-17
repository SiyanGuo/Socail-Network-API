const router = require('express').Router();
const {getAllUser, getUserById, createUser, updateUser, deleteUser, addFriend, deleteFriend} = require('../controllers/user-controllers')


//Set up GET all and Post at /api/users
router
    .route('/')
    .get(getAllUser)
    .post(createUser)


//set up GET one, PUT, and DELETE at /api/Users/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)


//    /api/users/:userId/friends/:friendId
router.route('/:userId/friends').post(addFriend);

router.route('/:userId/friends/:friendId').delete(deleteFriend);


module.exports = router;
