import dotenv from 'dotenv';
dotenv.config();
let productDao;
let shoppingCartDao;
let userDao;


switch (process.env.DATABASE) {

    case "mongoDB":
        const {  default: productDaoMongoDB } = await import('../DAOs/product/productDaoMongoDB.js');
        productDao = new productDaoMongoDB();

        const {  default: shoppingCartDaoMongoDB } = await import('../DAOs/shoppingCart/shoppingCartDaoMongoDB.js');
        shoppingCartDao = new shoppingCartDaoMongoDB();

        const {  default: userDaoMongoDB } = await import('../DAOs/user/userDaoMongoDB.js');
        userDao = new userDaoMongoDB();
               
        break
}
export { productDao, shoppingCartDao, userDao  }