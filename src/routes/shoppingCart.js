import { Router } from 'express';
import ShoppingCartController from '../controllers/ShoppingCartController.js';

const router = Router();

class routerShoppingCart{

    ShoppingCartController;

    constructor(){

        this.shoppingCartController = new ShoppingCartController();
    }

    start(){
       
        router.post("/", this.shoppingCartController.save);
        router.delete("/:id", this.shoppingCartController.deleteById);
        router.get("/productos", this.shoppingCartController.getAllProducts);
        router.post("/productos", this.shoppingCartController.saveProduct);

        return router;
    }
}


export default routerShoppingCart;