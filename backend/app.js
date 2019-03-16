const compression = require('compression');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const candidatUserRoutes = require('./routes/candidat-user');

var swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('./swagger.json');

const app = express();
app.use(compression());

//Set up mongoose connection
const mongoose = require('mongoose');
var mongoDB =
  'mongodb://testuser:testuser1234@ds053958.mlab.com:53958/graphqltesty';
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

mongoose.set('useCreateIndex', true);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/espace/', express.static(path.join(__dirname, 'dist/client')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/candidat', candidatUserRoutes);
app.use('/espace', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'dist/client', 'index.html'));
});

module.exports = app;
