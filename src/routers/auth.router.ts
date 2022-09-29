import express from 'express';
import passport from 'passport';

const router = express.Router();
import wrapperError from '../containErr/err'

import AuthController from "../controllers/auth.controller";
import checkLogin from "../middleware/check.login";

import authController from "../controllers/auth.controller";

router.get('/', wrapperError(AuthController.login))

router.post('/login', wrapperError(checkLogin.checkUserOrAdminRouter))

router.get('/register', wrapperError(authController.register))

router.post('/register', wrapperError(authController.register))

router.get('/error', wrapperError(authController.error))

router.get('/logout',wrapperError(authController.logout))

router.get('/google', passport.authenticate('google', {scope: ['profile']}));

router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/'}),

    async (req, res) => {

        res.redirect('/auth/user')
    }
)
router.get('/auth/user', (req, res) => {
    res.render('./users/homeUser')
})

export default router
