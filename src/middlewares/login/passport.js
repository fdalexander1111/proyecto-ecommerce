import passport from "passport";
import {loginStrategy, signupStrategy } from './strategies.js';
import local_strategy from "passport-local";
import { userDao  } from '../../models/DAOs/index.js';
import { Document, Types } from "mongoose";

const LocalStrategy = local_strategy.Strategy;

passport.use('login', new LocalStrategy(loginStrategy))
passport.use('signup', new LocalStrategy(
    {passReqToCallback: true}, 
    signupStrategy
))

passport.serializeUser((user, done) => {

   done(null, user);
 });


passport.deserializeUser(async (user, done) => {
   // id = Types.ObjectId(user.id);
    //const user = await userDao.getByname('id',id);
    done(null, user);
});


const passportSignup = passport.authenticate('signup',
    {failureRedirect: '/signup',
    session: false})

const passportLogin = passport.authenticate('login',
    {failureRedirect: '/login'});

export { passportSignup, passportLogin, passport  }

