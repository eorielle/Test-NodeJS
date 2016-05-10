var http = require('http');
var url = require('url');
var querystring = require('querystring');
var mmodule = require('./testmodule');
var markdown = require('markdown').markdown;


var EventEmitter = require('events').EventEmitter;
var jeu = new EventEmitter();

var server = http.createServer(function(req, res) {
    var page = url.parse(req.url).pathname;
    console.log(page);

    var query = url.parse(req.url).query;
    var params = querystring.parse(query);
    console.log(query);


    res.writeHead(200, {
        "Content-Type": "text/html"
    });
    if (page == "/") {
        mmodule.direbonjour();
        res.write(markdown.toHTML('un paragraphe en **markdown**'));
        jeu.emit('gameOver', 'vous avez perdu !');
        jeu.on('gameOver', function(message) {
            console.log(message);
        });

        res.write('Vous êtes à l\'accueil, que puis-je pour vous ?');
    } else if ('prenom' in params && 'nom' in params) {
        res.write('Votre nom est : ' + params.nom + " " + params.prenom);
    } else if (page == '/haha') {
        res.write('Vous êtes à .... ?');
    } else {
        res.write('Vous êtes perdu !');
    }
    res.end();
});

server.listen(8080);

server.on('close', function() {
    console.log('bye bye !');
});
