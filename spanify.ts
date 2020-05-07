var pdf = require('pdf-parse');
var Parser = require("simple-text-parser");
let fs = require('fs');
let spannedText = {
  'sentance' : 'string error',
  'word' : 'string error',
  'paragraph' : 'string error',
}

export class spanify {

  public async spanify(filePath){
    let dataBuffer = await fs.readFileSync(filePath);

    //------------------------------- parse sentance --------------------------------------------------------------
    await pdf(dataBuffer).then(function(data) {
      var parser = new Parser();
      console.log(dataBuffer);
      console.log(data);


      var text = data.text;
      var sentanceCount = 0;
      parser.addRule(/["’]?[A-Z][^.?!]+((?![.?!][’"]?\s["’]?[A-Z][^.?!]).)+[.?!’"]+/ig, function(tag) {
        sentanceCount++;
        return "<span class=" + '"' + "sentance" + sentanceCount.toString() + '"' + ">" + tag.substr(0) + "</span> ";
      });
      parser.addRule(/(\n\s)/ig, function(tag) {
        return "<br>" ;
      });
      spannedText.sentance = parser.render(text);
    }).catch(function(erro){
                console.log("Pdf error: ",erro);
                return null;
            });
//--------------------------------------------------------------------------------------------------
//------------------------------- parse word --------------------------------------------------------------
await pdf(dataBuffer).then(function(data) {
  var parser = new Parser();
  var text = data.text;
  var wordCount = 0;
  parser.addRule(/[\S]+/ig, function(tag) {
    wordCount++;
    return "<span class=" + '"' + "word" + wordCount.toString() + '"' + ">" + tag.substr(0) + "</span> ";
  });
  parser.addRule(/(\n\s)/ig, function(tag) {
    return "<br>" ;
  });

  spannedText.word = parser.render(text);
}).catch(function(erro){
            console.log("Pdf error: ",erro);
            return null;
        });
//--------------------------------------------------------------------------------------------------
//------------------------------- parse paragraph --------------------------------------------------------------
await pdf(dataBuffer).then(function(data) {
  var parser = new Parser();
  var text = data.text;
  var paragraphCount = 1;
  parser.addRule(/(\n\s)/ig, function(tag) {
    paragraphCount++;
    return "</span> " + "<br>" + "<span class=" + '"' + "paragraph" + paragraphCount.toString() + '"' + ">" + tag.substr(0);
  });

  spannedText.paragraph = "<span class=" + '"' + "paragraph1" +  '"' + ">" + parser.render(text) + "</span>";
}).catch(function(erro){
            console.log("Pdf error: ",erro);
            return null;
        });
//--------------------------------------------------------------------------------------------------
//------------------------- save JSON -------------------------------------------------------------
    fs.writeFile(__dirname + "/uploads/span.json", JSON.stringify(spannedText),(err) => {
    if (err) throw err;
    console.log('JSON created');
    });
//-------------------------------------------------------------------------------------------------
  }
}
