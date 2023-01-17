import { userDao } from '../../models/DAOs/index.js';
import logger from "../../services/loggerService.js";


export const loginStrategy = async (username, password, done) => {
    const user = await userDao.getByname('username',username);
    const isMatch = await user.comparePassword(password);
    if (!user || !isMatch) {
        return done(null, false, {message: 'El usuario o contraseña no coinciden'});
    }
    return done(null, user)
}

export const signupStrategy = async (req, username, password, done) => {
   
    try {
        const userExists = await userDao.getByname('username',username);

        if (userExists) {
            logger.error("El usuario ya esta registrado en la base de datos")
            return done(null, false, {message: 'El usuario ya esta registrado en la base de datos'});
        }
        const user = req.body;
        console.log(user);
        const userSave = await userDao.save(user);
        if(userSave){
            return done(null, user);
        }else{
            logger.error("Error creando usuario")
            return done(null, false, {message: 'Error creando usuario'});
        }
    } catch (err) {
        logger.error(err)
        return done(err)
    }
}
