const express = require('express');
const router = express.Router();
const user = require('../controllers/userController');
const  { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

router.use( verifyToken , authorizeRoles(2))

router.get('/dashboard' , user.getDashboard);
router.get('/mytask' , user.getMyTasks);
router.put('/uddateTask/:id' , user.updateMyTask)





module.exports = router;