const { Router } = require('express');
const { testPost } = require('../controllers/test');
const userAuth = require('../middlewares/auth');

const router = Router();


router.post('/test-post', userAuth, testPost)



module.exports = router