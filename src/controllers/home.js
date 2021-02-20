const home = {};

const path = require('path');
const html = path.join(__dirname, '../public/index.html');

home.home = (req, resp) => {
    resp.sendFile(html);
}

module.exports = home;