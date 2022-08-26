const cors = require('cors');
const express = require('express');
const path = require('path');
const errorMiddleware = require('./middlewares/errorMiddleware');
const Routes = require('./routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/login', Routes.login);
app.use('/users', Routes.users);
app.use('/products', Routes.products);
app.use('/sales', Routes.sales);
app.use('/images', express.static(path.join(__dirname, '..', '..', 'public')));
app.get('/coffee', (_req, res) => res.status(418).send());
app.use(errorMiddleware);
app.use('/register', Routes.register);

module.exports = app;
