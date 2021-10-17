const router = require('express').Router();
const userRoutes = require('./user-routes');
// const commentRoutes = require('./comment-routes');


//add prefix of '/pizzas' to routes created in 'pizza-routes.js'
router.use('/api/users', userRoutes);

// router.use('/api/thoughts', thoughtRoutes);


router.use((req, res) => {
    res.status(404).send('<h1>😝 404 Error!</h1>');
  });
  
module.exports = router;