import express from 'express';
import User from '../models/User';

const router = express.Router();

router.post('/', (req, res) =>{
    const{ credentials } = req.body;
    console.log("Entered email:",credentials.email);
    console.log("Entered password:",credentials.password);
    /*User.findOne({ email: credentials.email }).then( user => {
        console.log("User's email:",user.email);
        console.log("User's: password",user.password);
        if(user && user.isValidPassowrd(credentials.password)){
            res.json({ user: { email: user.email } });
        }else {
            res.status(400).json({ errors: { global: "Invalid username or password"} })
        }
    });*/
    res.json({ user: { email: credentials.email } });
});

export default router;