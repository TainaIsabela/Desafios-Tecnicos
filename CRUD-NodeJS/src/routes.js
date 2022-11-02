const router = require('express').Router();

const ContentController = require('./controllers/ContentController');

router.get('/', ContentController.getContent);

router.post('/content', ContentController.postContent);


module.exports = router;