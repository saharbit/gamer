const express = require('express');
const mongoose = require('mongoose');
const app = express();
const db=require('./config/keys').mongoURI;

const users=require('./routes/api/users');
const profile=require('./routes/api/profile');
const posts=require('./routes/api/posts');

mongoose
    .connect(db)
    .then(() => console.log('Connected DB'))
    .catch(err => console.log(err));

app.get ('/', (req,res) => res.send('hello sahar'))

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port=process.env.PORT || 5000;

app.listen(port, () => console.log({port}))