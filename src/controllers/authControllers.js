const User = require('../models/user');
const { credentials } = require('../validation');




module.exports.signup_post = async (req, res, next) => {
    // validating the req.body 
    const { error, value } = credentials.validate(req.body);
    try {
        if (!error) {
            const newUser = await User.create(value);
            res.status(201).json({
                'id': newUser._id,
                'email': newUser.email
            });
        }
        res.status(400);
        next(error)
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

    res.send('Hello from login handler');
}

module.exports.logout_get = async (req, res, next) => {
    res.send('Hello from logout handler');
}