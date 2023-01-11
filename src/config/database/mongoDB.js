import mongoose from "mongoose";
import { config } from "../config.js";
import logger from "../../services/loggerService.js";

const URIString = config.URIString;



export default class mongoDB {

    constructor(){
        const URIString = config.URIString;
        mongoose.set('strictQuery', false)
        this.connect();
    }

    async connect(){

        try {
            
            const connect  = await mongoose.connect(URIString);
            const connection = mongoose.connection;
           
            connection.once('open', () => {
                logger.info("Coneccion con mongoDB establecida");
            });
            
            return connect;

        } catch (err) {

            logger.error(`ERROR DE CONEXION + ${err}`);
            throw new Error(`ERROR DE CONEXION + ${err}`);
        
        }

    }

    async disconnect(){

        try {
            mongoose.connection.close();
        } catch (err) {
            logger.error(`ERROR DE CONEXION + ${err}`);
            throw new Error(`ERROR AL CERRAR LA CONEXION + ${err}`);
        }
        
    }

}