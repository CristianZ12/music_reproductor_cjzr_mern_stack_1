const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const router = require('../routes/routes');

module.exports = app => {
    //Setting
    
    //Setting Port
    app.set('Port', process.env.PORT || 4500);

    //Middleware
    app.use(morgan('dev'));
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    //Routes
    router(app);

    //Static File
    app.use(express.static(path.join(__dirname, '../public')));

    return app;
}