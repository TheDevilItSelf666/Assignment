const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');
const taskControl = require('../controllers/taskcontroller');
const  { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

router.use( verifyToken , authorizeRoles(1))

router.put('/updateUser/:id' , AdminController.updatedetails);
router.delete('/deleteUser/:id' , AdminController.deleteUser);
router.get('/allUsers' , AdminController.getAllUsers);
router.patch("/users/:id/toggle", AdminController.toggleUser);

router.get('/dashboard' , AdminController.getADashboard);

router.post('/task/create' , taskControl.createnewtask);
router.get('/task/getall' , taskControl.getAllTask);
router.get('/task/delete/:id' , taskControl.deleteTask);




module.exports = router;