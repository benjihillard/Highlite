var pdf = require('pdf-parse');
var Parser = require("simple-text-parser");
let fs = require('fs');

export class spanify {

  public spanify(filePath){
    let dataBuffer = fs.readFileSync(filePath);
    pdf(dataBuffer).then(function(data) {
      let spannedText = {
        'sentance' : 'string error',
        'word' : 'string error',
        'paragraph' : 'string error',
      }
      var parser = new Parser();
      var text = data.text;
      var sentanceCount = 0;
      var wordCount = 0;
      var paraCount = 0;
      parser.addRule(/["’]?[A-Z][^.?!]+((?![.?!][’"]?\s["’]?[A-Z][^.?!]).)+[.?!’"]+/ig, function(tag) {
        sentanceCount++;
        return "<span class=" + '"' + "sentance" + sentanceCount.toString() + '"' + ">" + " " + tag.substr(0) + "</span>";
      });
      spannedText.sentance = parser.render(text);
      parser.addRule(/(([\S]+))/ig, function(tag) {
        wordCount++;
        return "<span class=" + '"' + "word" + wordCount.toString() + '"' + ">" + " " + tag.substr(0) + " " + "</span>";
      });
      spannedText.word = parser.render(text);
      //(.+)((\r?\n.+)*)
      parser.addRule(/[^\r\n]+((\r|\n|\r\n)[^\r\n]+)*/ig, function(tag) {
        paraCount++;
        return "<span class=" + '"' + "para" + paraCount.toString() + '"' + ">" + tag.substr(0) + "</span>";
      });

      spannedText.paragraph = parser.render(text);
      fs.writeFile(__dirname + "/uploads/span.json", JSON.stringify(spannedText),(err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
    });
  }
}
