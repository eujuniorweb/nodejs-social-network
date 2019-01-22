const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/user.js');
const profile = require('./routes/api/profile.js');
const posts = require('./routes/api/post.js');

const app  = express();

const db = require('./config/keys').mongoURI;

mongoose.connect(db, { useNewUrlParser: true })
    .then(()=>console.log('Mogodb connected'))
    .catch(error => console.log(error));


app.get('/', (req,res)=>res.send("Hello"));

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>console.log(`Server Running on port ${PORT}`))