import {Router} from 'express';
import {body, param} from 'express-validator'
import { AuthController } from '../controllers/AuthController';
import { handleInputErrors } from '../middleware/validation';

const router = Router();



router.post('/create-account', 
    body('name').notEmpty().withMessage('Name is required'),
    body('password').notEmpty().withMessage('Password is required').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    body("password_confirmation").custom((value,{req})=>{
        if(value !== req.body.password){
            throw new Error('Passwords do not match')
        }
        return true
    }),
    body('email').isEmail().withMessage('Email is required'),
    handleInputErrors,
    AuthController.createAccount
)

router.post('/confirm-account',
    body('token').notEmpty().withMessage('Token is required'),
    handleInputErrors,
    AuthController.confirmAccount
)

router.post('/login',
    body('email').isEmail().withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is required'),
    handleInputErrors,
    AuthController.login
)

router.post('/request-code',
    body('email').isEmail().withMessage('Email is required'),
    handleInputErrors,
    AuthController.requestConfirmationCode
)

router.post('/forgot-password',
    body('email').isEmail().withMessage('Email is required'),
    handleInputErrors,
    AuthController.forgotPassword
)


router.post('/validate-token',
    body('token').notEmpty().withMessage('Token is required'),
    handleInputErrors,
    AuthController.validateToken
)


router.post('/update-password/:token',
    param('token').isNumeric().withMessage('Token is required'),
    body('password').notEmpty().withMessage('Password is required').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    body("password_confirmation").custom((value,{req})=>{
        if(value !== req.body.password){
            throw new Error('Passwords do not match')
        }
        return true
    }),
    handleInputErrors,
    AuthController.updatePasswordWithToken
)
export default router;

