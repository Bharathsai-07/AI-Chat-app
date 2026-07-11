import {Router} from 'express';
import * as userController from '../controllers/user.controller.js';
import {body} from 'express-validator';
import * as authMiddleware from '../middleware/auth.middleware.js';
import * as projectController from '../controllers/project.controller.js';
const router=Router();

router.post('/register',
    body('email').isEmail().withMessage('must be valid email'),
    body('password').isLength({min:3}).withMessage('must be at least 3 characters long'),
    userController.createUserController
);

router.post('/login',
    body('email').isEmail().withMessage('must be valid email'),
    body('password').isLength({min:3}).withMessage('must be at least 3 characters long'),
    userController.loginUserController
);
router.get('/profile',authMiddleware.authUser,userController.profileController);
router.get('/logout',authMiddleware.authUser,userController.logoutController);
router.get('/all',authMiddleware.authUser,userController.getAllUsersController);
export default router;