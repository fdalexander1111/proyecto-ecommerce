import { Router } from 'express';
import UserController from '../controllers/UserController.js';
import {passportSignup, passportLogin, passport } from '../middlewares/login/passport.js'

const router = Router();

class RouterAuth{

    userController;

    constructor(){

        this.userController = new UserController();
    }

    start(){
  
       router.get('/', this.userController.login)
       router.post('/login', passportLogin, this.userController.saveLogin);
       router.get('/signup', this.userController.signup)
       router.post('/signup', passportSignup,  this.userController.signupSave)
       router.get('/logout', this.userController.logout)
       router.post('/logout', this.userController.postLogout)

       return router;
    }

}

export default RouterAuth;