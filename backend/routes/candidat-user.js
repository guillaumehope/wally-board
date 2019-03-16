const express = require('express');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

// Controllers
const userController = require('../controllers/client/user');

// User related
router.post('/signup', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/candidat', checkAuth, userController.getMyProfile);
router.get('/candidats', userController.getProfiles);
router.get('/candidat/:id', userController.getProfileById);

module.exports = router;
