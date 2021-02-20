const express = require('express');
const router = express.Router();

//Controllers
const home = require('../controllers/home');
const users = require('../controllers/users');
const artists = require('../controllers/artist');
const albums = require('../controllers/album');
const singers = require('../controllers/singer');

module.exports = app => {
    //Home
    router.get('/', home.home);
    router.get('/register', home.home);
    router.get('/login', home.home);
    router.get('/profile', home.home);
    router.get('/users', home.home);
    router.get('/artist', home.home);

    //Users
    router.post('/api/user/register', users.register);
    router.post('/api/user/login', users.login);
    router.get('/api/users', users.users);
    router.delete('/api/delete/:id', users.deleteUsers);
    router.get('/api/user/:id', users.user);
    router.put('/api/user/:id', users.updateUsers);

    //Artists
    router.get('/api/artists', artists.artists);
    router.post('/api/artists', artists.addArtist);
    router.get('/api/artist/:id', artists.artist);
    router.put('/api/artist/:id', artists.updateArtist);
    router.delete('/api/artist/:id', artists.deleteUser);

    //Albums
    router.get('/api/albums/:id', albums.albums);
    router.post('/api/albums', albums.addAlbum);
    router.get('/api/album/:id', albums.album);
    router.put('/api/album/:id', albums.updateAlbum);
    router.delete('/api/album/:id', albums.deleteAlbum);

    //Singers
    router.get('/api/singers/:id', singers.singers);
    router.post('/api/singers', singers.addSinger);
    router.get('/api/singer/:id', singers.singer);
    router.put('/api/singer/:id', singers.updateSinger);
    router.delete('/api/singer/:id', singers.deleteSinger);

    app.use(router);
}