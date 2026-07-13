import {Router} from 'express';
import {body} from 'express-validator';
import * as projectController from '../controllers/project.controller.js';
import * as authMiddleware from '../middleware/auth.middleware.js';

const router=Router();

router.post('/create',
    authMiddleware.authUser,
    body('name').isString().withMessage('name is required'),
    projectController.createProject
);

router.get('/all',
    authMiddleware.authUser,
    projectController.getAllProjects
);

router.put('/add-user',
    authMiddleware.authUser,
    body('users').isArray().withMessage('users must be an array').bail()
    .custom((users)=> users.every(user=> typeof user === 'string')).withMessage('users must be an array of strings'),
    projectController.addUserToProject
)

router.get('/get-project/:projectId',
    authMiddleware.authUser,
    projectController.getProjectById
);
export default router;