import { productDao } from '../models/DAOS/index.js';
import { Document, Types } from "mongoose";


export default class ProductController{

    constructor(){

    }

    async getAll(req , res){

        try {
            const products = await productDao.getAll();
            if(products){
    
                res.json({
                    'status':'ok',
                    'message' : 'Lista de productos enviada correctamente',
                    'code':'200',
                    'products': products
                });
            }else{
                res.status(400).json({
                    'status':'nok',
                    'message' : 'No se encontraron productos',
                    'code':'400',
                    'products': null
                });
            }
       
        } catch (error) {
            res.json({error: error.message});
        }

    }

    async getById(req , res){
        
        try {

            let product_id = new Types.ObjectId(req.params.id);
            const producto = await productDao.getById(product_id);
    
            if(producto){
    
                res.json({
                    'status':'ok',
                    'message' : 'Producto enviado correctamente',
                    'code':'200',
                    'product': producto
                });
            }else{
                res.status(400).json({
                    'status':'nok',
                    'message' : 'Producto no encontrado',
                    'code':'400',
                    'product': null
                });
            }
            
        } catch (error) {

            res.status(400).json({error: error.message});
        }
    }

    async save(req , res){

        try {

            const product = req.body;
            const result = await productDao.save(product);

            if(result){

                res.json({
                    'status':'ok',
                    'message' : 'Lista de productos entregada correctamente',
                    'code':'200',
                    'result': result
                });
            }else{
                res.status(400).json({
                    'status':'nok',
                    'message' : 'No se pudo devolver la lista de productos',
                    'code':'400',
                    'result': null
                });
            }
            
        } catch (err) {

            res.status(400).json({error: err.message});
        }
        
    }
    async updateById(req , res){

        try {
            
            const productReq =  req.body;
            let product_id = new Types.ObjectId(req.params.id);
            const updateProduct = await productDao.updateById(product_id, productReq);
            
            if(updateProduct){
                res.json({
                    'status':'ok',
                    'message' : 'Producto editado correctamente',
                    'code':'200',
                    'product': updateProduct
                });
            }else{
                res.status(400).json({
                    'status':'nok',
                    'message' : 'Error al editar el producto',
                    'code':'400',
                    'product': null
                });
            }

        } catch (error) {
             res.status(400).json({error: error.message});
        }

    }

    async deleteById(req, res){


        try {
            
            let product_id = new Types.ObjectId(req.params.id);
            const deleteProduct = await productDao.deleteById(product_id);
            if(deleteProduct){
                res.json({
                    'status':'ok',
                    'message' : 'Producto Eliminado correctamente',
                    'code':'200',
                });
            }else{
                res.status(400).json({
                    'status':'nok',
                    'message' : 'No se elimino o no se encontro el producto',
                    'code':'400',
                });
            }
        } catch (error) {
            res.status(400).json({error: error.message});
        }

    }
}