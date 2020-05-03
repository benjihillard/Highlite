var fs = require('fs');
var pdf = require('pdf-parse');
var Parser = require("simple-text-parser");

function spanify(filePath){
  var sentanceString;
  var wordString;
  var paragraphString;
  var strings;
  fs.readFile(filePath, function (err, data){
    var fileBuffer = data;
    pdf(fileBuffer).then(function(data) {
      var parser = new Parser();
      var text = data.text;
      var sentanceCount = 0;
      parser.addRule(/["’]?[A-Z][^.?!]+((?![.?!][’"]?\s["’]?[A-Z][^.?!]).)+[.?!’"]+/ig, function(tag) {
        sentanceCount++;
        return "<span class=" + '"' + "sentance" + sentanceCount.toString() + '"' + ">" + " " + tag.substr(0) + "</span>";
      });
      sentanceString = parser.render(text);
      //console.log("Sentence String In: " + sentanceString);
    });
    pdf(fileBuffer).then(function(data) {
      var parser = new Parser();
      var text = data.text;
      var wordCount = 0;
      parser.addRule(/(([\S]+))/ig, function(tag) {
        wordCount++;
        return "<span class=" + '"' + "word" + wordCount.toString() + '"' + ">" + " " + tag.substr(0) + " " + "</span>";
      });
      wordString = parser.render(text);
      //console.log("Word String In: " + wordString);
    });
    pdf(fileBuffer).then(function(data) {
      var parser = new Parser();
      var text = data.text;
      var paraCount = 0;
      parser.addRule(/[^\r\n]+((\r|\n|\r\n)[^\r\n]+)*/ig, function(tag) {
        paraCount++;
        return "<span class=" + '"' + "para" + paraCount.toString() + '"' + ">" + tag.substr(0) + "</span>";
      });
      paragraphString = parser.render(text);
      //console.log("Paragraph String In: " + paragraphString);
    });
  });
  setTimeout(function(){
    strings = {
      "sentences": sentanceString,
      "words": wordString,
      "paragraphs": paragraphString
    }
    console.log(strings);
  },100);

  return strings;
}

spanify("./Unit-4-Paper.pdf");
