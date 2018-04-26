import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

//TOD: add uniqueness and email validations to email field
const schema = new mongoose.Schema({
    email: {type: String, required: true, lowercase: true, index: true},
    passwordHash: {type: String, required: true}
}, {timestamps: true});

schema.methods.isValidPassowrd = function isValidPassword(password){
    console.log(password);
 return bcrypt.compareSync(password, this.passwordHash);
};

export default mongoose.model('User', schema);
