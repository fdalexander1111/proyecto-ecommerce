import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import session from "express-session";
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import RouterAuth from '../src/routes/auth.js';
import routerShoppingCart from '../src/routes/shoppingCart.js';
import RouterProduct from './routes/products.js';
import { config } from "../src/config/config.js";
import passport from 'passport';


const app = express();



//settings 

app.set('port', process.env.PORT || 3000);
const routerUser  = new RouterAuth();
const routerCar  = new routerShoppingCart();
const routerProduct  = new RouterProduct();

const sessionMiddleware = session({
    secret: 'STRING_TO_SIGN_SESSION_ID',
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ 
        mongoUrl: config.URIString,
        retries: 0,
        ttl: 60 * 60 * 24, // 1 day
    }),
});


//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({extended: true}));
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());


//routes 

app.use('/productos', routerProduct.start());
app.use('/carrito', routerCar.start());

app.use(routerUser.start());


app.use((req, res) => {
  const array = {
    "error": -2,
    "descripcion":  `ruta: ${req.url} metodo: ${req.method} no implementado`
  }
  res.status(404).json(array);

})

export default app;