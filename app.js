const express = require('express');
const ExpressError = require('./expressError');
const shopRoutes = require('./shopRoutes');
// const middleware = require('./middleware');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/shopping', shopRoutes);

// app.get('/secret', middleware.checkForPassword, (req, res, next) => {
//     return res.send('I LOVE YOU <3');
// });

// app.get('/private', middleware.checkForPassword, (req, res, next) => {
//     return res.send('THIS PAGE IS PRIVATE');
// });

app.use((req, res, next) => {
    let e = new ExpressError('Page Not Found', 404);
    next(e);
});

app.use((error, req, res, next) => {
    let err = error.status || 500;
    let msg = error.msg;
    return res.status(err).send(msg);
});

module.exports = app;
