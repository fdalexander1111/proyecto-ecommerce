import mongoose from 'mongoose';

const shoppingCartCollection = 'shoppingCart';

const shoppingCartsSchema = new mongoose.Schema({

    email: { type: String, required: true,  max: 400},
    address: { type: String, required: true,  max: 400},
    productos: { type: [], required: false },
    
    
},{timestamps: true});


export const shoppingCarts = mongoose.model(shoppingCartCollection, shoppingCartsSchema);