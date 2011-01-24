var ams = require('../../index'),
    join = require('path').join;

var publ = join(__dirname, 'public'),
    src = join(__dirname, 'src');

ams.build.find({
        root: src
    })
    .process()
    .combine({
        js: publ + '/main.js'
    })
    .write(publ);