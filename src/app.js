require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const volleyball = require('volleyball');


// Database and listen to port
const connectDb = require('./db.config');
connectDb();

// middleware
const { isLoggedIn } = require('./middlewares/middleware');

// requiring routes
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');


app.use(volleyball);
app.use(cookieParser());
app.use(express.json());



// using routes
app.use('/auth', authRoutes);
app.use('/dashboard', isLoggedIn, dashboardRoutes);




app.get('/', (req, res, next) => {
    res.json({
        'status': 200,
        'message': 'Hello form home route'
    });
});


app.get('/*', (req, res) => {
    res.status(404).send('not found')
})


app.use(function (err, req, res, next) {
    res.status(500).json({ "error": err.message });
});



const PORT = 3000 || process.env.DBURL;
app.listen(PORT, () => console.log(`server started at ${PORT}`));
