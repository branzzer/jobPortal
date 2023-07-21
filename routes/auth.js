const { Router } = require('express');
const { resgisterNewUser, loginUser } = require('../controllers/auth');


const router = Router();


router.post('/register', resgisterNewUser)
router.post('/login', loginUser);



module.exports = router