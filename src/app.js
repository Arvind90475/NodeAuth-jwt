require('dotenv').config();
const express = require('express');
const app = express();
const volleyball = require('volleyball');
const mongoose = require('mongoose');

// db config
const url = 'mongodb://localhost:27017/nodeAuth-jwt' || process.env.DBURL;
connectDb();

// requiring routes
const authRoutes = require('./routes/authRoutes');


app.use(volleyball);
app.use(express.json());



// using routes
app.use('/auth', authRoutes);





app.get('/', (req, res, next) => {
    res.json({
        'status': 200,
        'message': 'Hello form home route'
    });
});


app.get('/*', (req, res) => {
    res.send('not found')
})

async function connectDb() {
    try {
        await mongoose.connect(url,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );
        console.log('connected to DB');
    } catch (error) {
        console.log(error);
    }
}


app.use(function (err, req, res, next) {
    res.json({ "error": err.message });
});




const port = 3000;
app.listen(port, (err) => {
    console.log(`server has started at port ${port}`)
})