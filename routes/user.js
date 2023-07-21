const { Router } = require('express');



const router = Router();


router.post('/register', resgisterNewUser)
router.post('/login', loginUser);



module.exports = router