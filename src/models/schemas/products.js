import mongoose from 'mongoose';

const productsCollection = 'products';

const productsSchema = new mongoose.Schema({

    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    codigo: {type: String, required: true },
    foto: {type: String, required: true },
    precio: {type: Number, required: true },
    stock: {type: Number, required: true },
    categoria:{type: String, required: true },
    
},{timestamps: true});

const products = mongoose.model(productsCollection, productsSchema);

export default products;