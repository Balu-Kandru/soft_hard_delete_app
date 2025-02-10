const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
dotenv.config();

//connect to DB
const dbUrl = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017';
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connected to DB')
})

app.listen(3000, () => console.log('Server running......'));