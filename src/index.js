require('dotenv').config();
const express = require('express');
const server = require('./server/server');
const app = server(express());
require('./database');

//Listening Port
app.listen(app.get('Port'), () => {
    console.log(`Server on Port ${app.get('Port')}`);
});
