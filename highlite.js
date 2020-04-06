//file parsing
var formidable = require('formidable');
var fs = require('fs');
var express = require('express');
var app = express();


app.post('/', function (req, res){
    console.log("jdskfhs");
    var filecontent = "";
    var form = new formidable.IncomingForm();

    form.parse(req);

    form.on('fileBegin', function (name, file){
      file.path = __dirname + '/uploads/' + file.name;
      fs.readFile(file.path, function (err, data){
        var fileBuffer = data;
        var filePath = file.path;
        var fileName = file.name;
        var fileextension = filereader.getFileExtension(fileName);
      });
    });
});

app.listen(3000);
