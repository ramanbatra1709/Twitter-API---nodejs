const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const twit = require('twit');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.listen(3000);
