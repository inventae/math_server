// a simple TeX-input example
var mjAPI = require("./lib/mj-single.js");
var express = require('express');
var app = express();

mjAPI.config({
  MathJax: {}
});
mjAPI.start();

app.get('/', function (req, res) {
  var yourMath = req.query.formula;

  mjAPI.typeset({
    math: yourMath,
    format: "TeX", // "inline-TeX", "MathML"
    svg: true, //  svg:true,
  }, function (data) {
    if (!data.errors) {
      res.status(200);
      res.header("Content-Type", "image/svg+xml");
      res.send( data.svg )
    }else{
      res.status(422);
      res.send( "Erro na formula!" )
    }
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log('listening...');
});
