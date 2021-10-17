const router = require('express').Router();
const {getAllUser, getUserById, createUser, updateUser, deleteUser} = require('../controllers/user-controllers')


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

module.exports = router;
