const router = require('express').Router();
const {getAllThought, getThoughtById, addThought, updateThought, removeThought, addReaction, removeReaction} = require('../controllers/thought-controllers');

// /api/thoughts
router.route('/').get(getAllThought)

// /api/thoughts/<thoughtId>
router.route('/:thoughtId').get(getThoughtById)

// /api/thoughts/<userId>
router.route('/:userId').post(addThought);

// /api/thoughts/<userId>/<thoughtId>
router
.route('/:userId/:thoughtId')
.put(updateThought)
.delete(removeThought)

// /api/thoughts/<thoughtId>/reactions

router.route('/:thoughtId/reactions/').post(addReaction)
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;