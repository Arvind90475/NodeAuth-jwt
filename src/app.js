require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');



// db config
const url = 'mongodb://localhost:27017/nodeAuth-jwt' || process.env.DBURL;
connectDb();




// requiring routes
const auth = require('./rotues/authRoutes');


// using routes
app.use('/auth', auth);



app.use(express.json());




app.get('/', (req, res, next) => {
    res.json({
        'status': 200,
        'message': 'success'
    });
});


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

app.use(errorHandler);

function errorHandler(req, res, err) {
    res.send('not found');
}




const port = 3000;
app.listen(port, (err) => {
    console.log(`server has started at port ${port}`)
})