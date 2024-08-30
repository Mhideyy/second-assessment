const express = require('express');
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const userRoute = require('./routes/user');
const postRoute = require('./routes/post');
dotenv.config();

mongoose
        .connect(process.env.MONGO_URL)

        .then(()=> console.log('connected'))

        .catch(()=> console.log('error'))

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;


app.use(userRoute);
app.use(postRoute);


app.listen(PORT, () => {
    console.log(`app is running at ${PORT}`);
});