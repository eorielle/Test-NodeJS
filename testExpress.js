var express = require('express');

var app = express();

app.get('/',function(req,res){
  res.setHeader('Content-Type','text/plain');
  res.end('vous êtes à l\'accueil');
});

app.get('/sous-sol', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Vous êtes dans la cave à vins, ces bouteilles sont à moi !');
});

app.get('/etage/1/chambre', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hé ho, c\'est privé ici !');
});

app.get('/etage/:num/chambre',function(req,res){
  res.setHeader('Content-Type','text/plain');
  res.end("Vous êtes à la chambre de l\'etage no." + req.params.num);
});

app.use(function(req,res){
  res.setHeader('Content-Type','text/plain');
  res.status(404).send('Page introuvable !');
});

app.listen(8080);
