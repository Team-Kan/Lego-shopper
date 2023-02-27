require("dotenv").config()
const express = require('express');
const app = express();
const path = require('path');
const morgan = require("morgan");
const cors = require("cors");
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/static', express.static(path.join(__dirname, '../static')));


app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '../static/index.html')));

app.use((req, res, next) => {
  console.log("<____Body Logger START____>");
  console.log(JSON.stringify(req.body));
  console.log("<____Body Logger END_____>");

  next();
});

app.use('/api', require('./api'));

app.use((err, req, res, next)=> {
  console.log(err);
  res.status(err.status || 500).send({ error: err.message });
});

module.exports = app;
