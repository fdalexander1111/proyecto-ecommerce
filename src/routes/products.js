import { Router } from 'express';
import { auth } from '../middlewares/auth.js';
import ProductController from '../controllers/ProductController.js';

const router = Router();

class RouterProduct{

    productController;

    constructor(){

        this.productController = new ProductController();
    }

    start(){
       
        router.get("/", this.productController.getAll);
        router.get("/category/:category", this.productController.getAllCategory);
        router.post("/", auth, this.productController.save);
        router.get("/:id", this.productController.getById);
        router.put("/:id",auth,  this.productController.updateById);
        router.delete("/:id",auth,  this.productController.deleteById);

        return router;
    }
}


export default RouterProduct;