require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { user } = require('../validations/authValidation');




module.exports.signup_post = async (req, res, next) => {
    // validating the req.body 
    const { error, value } = user.validate(req.body);
    try {
        if (error) {
            res.status(400);
            throw new Error(error);
        }
        // value represents the user to be created whose password is hashed in mongoose hooks
        const newUser = await User.create(value);
        const data = { id: newUser._id, email: newUser.email };
        res.status(201).json(data);
    } catch (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
            const err = new Error('User already exists');
            res.status(400);
            next(err);
        }
        next(err);
    }
}



module.exports.login_post = async (req, res, next) => {
    const { error, value } = user.validate(req.body);
    try {
        if (error) {
            res.status(422);
            throw new Error('validation error');
        }
        const dbUser = await User.findOne({ email: value.email });//find user in db whose email matches with provided one
        if (!dbUser) {
            // provided email does not match with what's inside db
            res.status(422);
            throw new Error('User does not exist');
        }
        const passwordMatched = await bcrypt.compareSync(value.password, dbUser.password);
        if (!passwordMatched) {
            // password does not match
            res.status(401);
            throw new Error('Wrong password');
        }
        // everything is fine we send token along with user data
        const token = jwt.sign({ data: 'foobar' }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { maxAge: 60 * 60 * 24 * 1000, httpOnly: true });
        res.status(201).json({ message: 'success' });

    } catch (error) {
        next(error);
    }

}

module.exports.logout_get = async (req, res, next) => {
    res.send('Hello from logout handler');
}