import mongoDBContainer from "../../mongoDBContainer.js";
import { shoppingCarts } from '../../schemas/shoppingCart.js';


export default class shoppingCartDaoMongoDB extends mongoDBContainer{


    constructor() {
        super(shoppingCarts);
    }    
} 