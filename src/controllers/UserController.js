import logger from '../services/loggerService.js';
import { userDao } from '../models/DAOs/index.js';

export default class UserController{

    constructor(){

    }
    async login(req, res){

        logger.info( `Pantalla de inicio de session`);
        res.status(200).json({
            'status':'ok',
            'message' : 'Pantalla de inicio de session',
            'code':200            
        });
    }

    saveLogin = async (req, res) =>{
        
        try {
            if(req.body.username){
                req.session.username = req.body.username; //correo
                req.session.address = req.body.address;
                await req.session.save();

                res.redirect('/carrito/productos');
            }else{
                res.status(400).json({
                    'status':'nok',
                    'message' : 'No se pudo iniciar sesion',
                    'code':'400',
                });
            }
        
        } catch (error) {
            logger.error(`Ha ocurrido un error ${error}`);
        }

      
    }

    async signup(req, res){

        logger.info( `Pantalla de registro`);
        res.status(200).json({
            'status':'ok',
            'message' : 'Pantalla de registro',
            'code':200            
        });
    }

    async signupSave(req, res){

        logger.info( `Usuario Guardado correctamente`);
        res.status(200).json({
            'status':'ok',
            'message' : 'Usuario Guardado correctamente',
            'code':200            
        });
    }

    async logout(req, res){

        //vista de logout

    }

    async postLogout(req, res){

        req.session.destroy((err) => {
            if(err) {
              res.send("Error al cerrar sesion");
            } else {
                res.render("logout");
            }
        });

    }

    async getUserByUsernameSession(username){

        try {
            const user = userDao.getByname('username', username);
            if(user){
               return user; 
            } 

            return false;

        } catch (error) {
            logger.error(`Ha ocurrido un error ${error}`);
        }
    }
}




   
 