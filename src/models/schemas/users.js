import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const usersCollection = 'users';

const usersSchema = new mongoose.Schema({
    username: { type: String, required: true, max: 400}, //email
    password: { type: String, required: true, max: 20 },
    password_confirmation : { type: String, required: true, max: 20 },
    name: { type: String, required: true, max: 100 },
    lastName: { type: String, required: true, max: 100 },
    phone: { type: String, required: true, max: 15 }, 
    address: { type: String, required: true, max: 100 }
});


usersSchema.pre('save', async function (next){
    const user = this;
    if(!user.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
});

usersSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}



export const users = mongoose.model(usersCollection, usersSchema);