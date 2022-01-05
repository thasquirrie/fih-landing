const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/logout', authController.protect, authController.logout);
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.patch(
  '/update-me',
  authController.protect,
  userController.getMe,
  userController.updateUser
);

router.patch(
  '/update-password',
  authController.protect,
  authController.updatePassword
);

router.get(
  '/me',
  authController.protect,
  userController.getMe,
  userController.getUser
);

router.get(
  '/students',
  authController.protect,
  authController.restrictTo('admin'),
  userController.getUsersByRole
);

router.get(
  '/volunteers',
  authController.protect,
  authController.restrictTo('admin'),
  userController.getUsersByRole
);

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    userController.getUsers
  )
  .post(userController.createUser);

router
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    userController.getUser
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    userController.updateUser
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    userController.deleteUser
  );

module.exports = router;
