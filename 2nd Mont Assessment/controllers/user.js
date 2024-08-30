const userModel = require('../models/user');
const bcrypt = require('bcryptjs')

// creating a new user
const createUser = async (req,res) =>{
    const { password, ...others} = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = new userModel({ ...others, password:hashedPassword });
    try {
        await newUser.save();
        res.json({ message: "PROFILE CREATED SUCCESSFULLY" });
    } catch (error) {
        console.log(error.message);
    };
};

// logging in function
const loginUser = async (req,res)=> {
    const { email, password } = req.body;
    try {
        const userInfo = await userModel.findOne({ email });
        if(!userInfo){
            return res.json({ message: "wrong credentials" });
        };
        const verify = bcrypt.compareSync(password, userInfo.password);
        if(!verify){
            return res.json({ message: "wrong credentials" });
        };
    res.json(userInfo);

    } catch (error) {
        console.log(error.message);
    }

};

 




module.exports = { createUser, loginUser };