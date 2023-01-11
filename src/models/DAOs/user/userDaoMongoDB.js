import mongoDBContainer from "../../mongoDBContainer.js";
import { users } from '../../schemas/users.js';


export default class userDaoMongoDB extends mongoDBContainer{


    constructor() {
        super(users);
    }    
} 
