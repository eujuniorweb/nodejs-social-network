const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/user.js');
const profile = require('./routes/api/profile.js');
const posts = require('./routes/api/post.js');

const app  = express();

//Body parser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// db config
const db = require('./config/keys').mongoURI;

// connect to mongo
mongoose.connect(db, { useNewUrlParser: true })
    .then(()=>console.log('Mogodb connected'))
    .catch(error => console.log(error));

// passport middleware
app.use(passport.initialize());

// passport config
require('./config/passport')(passport);


// use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>console.log(`Server Running on port ${PORT}`))