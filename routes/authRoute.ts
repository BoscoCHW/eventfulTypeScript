import express from "express";
import passport from "../middleware/passport";
import { forwardAuthenticated } from "../middleware/checkAuth";
import authController from "../controller/auth_controller";
import upload from "../middleware/multer";
const router = express.Router();


router.get("/register", forwardAuthenticated, authController.register);
router.get("/login", forwardAuthenticated, authController.login);

router.post(
    "/register",
    upload.single('avatar'),
    authController.registerSubmit,
    passport.authenticate("local", {
        successRedirect: "/reminders",
        failureRedirect: "/auth/login"
    })
);
router.post(
    "/login", 
    passport.authenticate("local", {
        successRedirect: "/reminders",
        failureRedirect: "/auth/login",      // Route back to /auth/login on failed authentication
    })
);

router.get('/github', forwardAuthenticated,
  passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get(
    '/github/callback', 
    passport.authenticate('github', { 
        successRedirect: '/reminders',
        failureRedirect: '/auth/login'
    })
);

router.get('/logout', authController.logout);


export default router;
