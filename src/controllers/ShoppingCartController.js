import { shoppingCartDao, userDao } from '../models/DAOs/index.js';
import { productDao } from '../models/DAOS/index.js';
import { Document, Types } from "mongoose";
import UserController from './UserController.js';
import logger from '../services/loggerService.js';
import { createLogger } from 'winston';


export default class ShoppingCartController{

    constructor(){
     
    }
 
    async getAll(req , res){

        try {
            const shoppingCart = await shoppingCartDao.getAll();
            if(shoppingCart){
    
                res.json({
                    'status':'ok',
                    'message' : 'Carrito de compras enviado correctamente',
                    'code':'200',
                    'shoppingCart': shoppingCart
                });
            }else{
                res.status(400).json({
                    'status':'nok',
                    'message' : 'No se encontraron el carrito de compras',
                    'code':'400',
                    'shoppingCart': null
                });
            }
       
        } catch (error) {
            res.json({error: error.message});
        }
    
    }
    
    async getById(req , res){
        
        try {
    
            let shoppingCart_id = new Types.ObjectId(req.params.id);
            const shoppingCart = await shoppingCartDao.getById(shoppingCart_id);
    
            if(shoppingCart){
    
                res.json({
                    'status':'ok',
                    'message' : 'Carrito enviado correctamente',
                    'code':'200',
                    'shoppingCart': shoppingCart
                });
            }else{
                res.status(400).json({
                    'status':'nok',
                    'message' : 'carrito no encontrado',
                    'code':'400',
                    'shoppingCart': null
                });
            }
            
        } catch (error) {
    
            res.status(400).json({error: error.message});
        }
    }
    
    async save(req , res){
    
        try {
    
            const shoppingCart = req.body;
            const result = await shoppingCartDao.save(shoppingCart);
    
            if(result){
    
                res.json({
                    'status':'ok',
                    'message' : 'Se salvo corretamente el carrito de compras',
                    'code':'200',
                    'result': result
                });
            }else{
                res.status(400).json({
                    'status':'nok',
                    'message' : 'No se pudo salvar los datos del carrito',
                    'code':'400',
                    'result': null
                });
            }
            
        } catch (err) {
    
            res.status(400).json({error: err.message});
        }
        
    }
        
    async deleteById(req , res){
        
        try {
            
            let shoppingCart_id = new Types.ObjectId(req.params.id);
            const deleteItem = await shoppingCartDao.deleteById(shoppingCart_id);
            if(deleteItem){
                res.json({
                    'status':'ok',
                    'message' : 'Carrito de compras Eliminado correctamente',
                    'code':'200',
                });
            }else{
                res.status(400).json({
                    'status':'nok',
                    'message' : 'No se elimino o no se encontro el carrito de compras',
                    'code':'400',
                });
            }
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    
    }

    async getCartByUserId(userId){
        const cart = await userDao.getByname('id', userId);
        if(cart){
            return cart;
        }else{
            return false;
        }
    }
    
    getAllProducts = async(req , res) => {
        try {
           
            if(!req.session.username){
                res.status(400).json({
                    'status':'nok',
                    'message' : 'Debe haber un usuario para poder ver el carrito',
                    'code':'400',
                });
            }
     
            const  user = await userDao.getByname('username', req.session.username);
            let shoppingCart = await this.getCartByUserId(user._id);
            if(!shoppingCart){
                shoppingCart = await this.newCar(user);
            }
            const products = shoppingCart.productos;
         
            if(products){
    
                res.json({
                    'status':'ok',
                    'message' : 'Se envio correctamente la lista de productos',
                    'code':'200',
                    'result': products
                });
            }else{
                res.status(400).json({
                    'status':'nok',
                    'message' : 'No se pudo enviar la lista de productos del carrito',
                    'code':'400',
                    'result': null
                });
            }
    
        } catch (error) {
            
            res.status(400).json({error: error.message});
        }
    }
    
    async saveProduct(req , res){
    
        try {
            
            let cart_id = new Types.ObjectId(req.params.id);
            let prod_id = new Types.ObjectId(req.body.id);
            const product = await productDao.getById(prod_id);
            const shoppingCart = await shoppingCartDao.getById(cart_id);
            const saveProduct = await shoppingCart.product.save(product);
    
            if(saveProduct){
                res.json({
                    'status':'ok',
                    'message' : 'El producto se agrego correctamente al carrito',
                    'code':'200',
                });
            }else{
                res.json({
                    'status':'nok',
                    'message' : 'Error al agregar un producto al carrito',
                    'code':'400',
                });
            }
         
        } catch (error) {
            
            res.status(400).json({error: error.message});
        }
    }

    newCar = async (user) => {
        try {           
         
            const shoppingCart = new Object();
            shoppingCart.email = user.username;
            shoppingCart.address = user.address;
            shoppingCart.products = [];
            const result = await shoppingCartDao.save(shoppingCart);
    
            if(result){
    
                return result;
            }else{
                return false;
            }
            
        } catch (err) {
    
            logger.error(err);
        }
    }
}