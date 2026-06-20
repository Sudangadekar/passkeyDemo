const express = require('express');
const cors = require('cors');

const registerRoutes = require('./routes/register.routes');
const loginRoutes = require('./routes/login.routes');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/register', registerRoutes);
app.use('/api/login', loginRoutes);

module.exports = app;