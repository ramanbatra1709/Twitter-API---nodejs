const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const twit = require('twit');
require('dotenv').config()

var T = new twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    timeout_ms: 60*1000,
});

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/tweets/:search', function(req, res)   {
    
    T.get('search/tweets', { q: req.params.search, count: 5 }, function(err, data, response) {
        console.log(data)
      });

    console.log(req.params.search);
    res.json({
        'status': 'Success'
    });
});

app.listen(3000);
