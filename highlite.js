//file parsing
var formidable = require('formidable');
var fs = require('fs');
var filereader = require('filereader');
var pdf = require('pdf-parse');
var Parser = require("simple-text-parser");
//string parsing
var cheerio = require('cheerio');

// global variables
global.wordString = "Sorry something has gone terribly wrong!";
global.sentanceString = "Sorry something has gone terribly wrong!";
global.paragraphString = "Sorry something has gone terribly wrong!";

//server
var express = require('express');
var app = express();

app.get('/', function (req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/read.html', function (req, res){
  fs.readFile(__dirname + '/read.html', {encoding: 'utf8'}, function(error, data) {
    var $ = cheerio.load(data); // load in the HTML into cheerio
    //$('#' + 'bodytext').html(sentanceString);
    $('p.bodytext').html(sentanceString);
    fs.writeFile(__dirname + '/read.html', $.html(),function (err) {
      if (err) throw err;
      console.log('Saved!');
      });
  });
  res.sendFile(__dirname + '/read.html');
});

app.post('/', function (req, res){
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
        switch (fileextension) {
          case '.pdf':
            wordString = "the erfg";
            pdf(fileBuffer).then(function(data) {
              var parser = new Parser();
              var text = data.text;
              var sentanceCount = 0;

              parser.addRule(/["’]?[A-Z][^.?!]+((?![.?!][’"]?\s["’]?[A-Z][^.?!]).)+[.?!’"]+/ig, function(tag) {
                sentanceCount++;
                return "<span class=" + '"' + "sentance" + sentanceCount.toString() + '"' + ">" + tag.substr(0) + "</span>";
              });
              //console.log(parser.render(text));
              sentanceString = parser.render(text);
            });

            pdf(fileBuffer).then(function(data) {
              var parser = new Parser();
              var text = data.text;
              var wordCount = 0;

              parser.addRule(/(([\S]+))/ig, function(tag) {
                wordCount++;
                return "<span class=" + '"' + "word" + wordCount.toString() + '"' + ">" + tag.substr(0) + "</span>";
              });
              //console.log(parser.render(text));
              wordString = parser.render(text);
            });


            pdf(fileBuffer).then(function(data) {
              var parser = new Parser();
              var text = data.text;
              var paraCount = 0;
              //(.+)((\r?\n.+)*)
              parser.addRule(/[^\r\n]+((\r|\n|\r\n)[^\r\n]+)*/ig, function(tag) {
                paraCount++;
                return "<span class=" + '"' + "para" + paraCount.toString() + '"' + ">" + tag.substr(0) + "</span>";
              });
              //console.log(parser.render(text));
              paragraphString = parser.render(text);
            });


            break;
            default:
              filecontent = filename;
            }

      });
    });
    console.log(paragraphString);
    console.log(sentanceString);
    console.log(wordString);
    return res.redirect('/read.html');
});

app.listen(3000);
