const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const app = express();

mongoose.connect('mongodb://localhost:27017/omnistack10', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());
app.use(routes);

app.get('/', (req, res) => {
    return res.json({ message: 'Hello World' });
});

app.listen(3333, () => {
    console.log('Listening on port 3333!');
});