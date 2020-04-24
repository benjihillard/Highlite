"use strict";
exports.__esModule = true;
var fs = require('fs');
var pdf = require('pdf-parse');
var Parser = require("simple-text-parser");
var spanify = /** @class */ (function () {
    function spanify() {
        this.spanedText = {
            'sentanceString': this.sentanceString,
            'wordString': this.wordString,
            'paragraphString': this.paragraphString
        };
    }
    spanify.prototype.spanify = function (filePath) {
        fs.readFile(filePath, function (err, data) {
            var fileBuffer = data;
            pdf(fileBuffer).then(function (data) {
                var parser = new Parser();
                var text = data.text;
                var sentanceCount = 0;
                parser.addRule(/["’]?[A-Z][^.?!]+((?![.?!][’"]?\s["’]?[A-Z][^.?!]).)+[.?!’"]+/ig, function (tag) {
                    sentanceCount++;
                    return "<span class=" + '"' + "sentance" + sentanceCount.toString() + '"' + ">" + tag.substr(0) + "</span>";
                });
                this.spanedText.sentanceString = parser.render(text);
            });
            pdf(fileBuffer).then(function (data) {
                var parser = new Parser();
                var text = data.text;
                var wordCount = 0;
                parser.addRule(/(([\S]+))/ig, function (tag) {
                    wordCount++;
                    return "<span class=" + '"' + "word" + wordCount.toString() + '"' + ">" + " " + tag.substr(0) + " " + "</span>";
                });
                this.spanedText.wordString = parser.render(text);
                //console.log(spanedText.wordString);
            });
            pdf(fileBuffer).then(function (data) {
                var parser = new Parser();
                var text = data.text;
                var paraCount = 0;
                //(.+)((\r?\n.+)*)
                parser.addRule(/[^\r\n]+((\r|\n|\r\n)[^\r\n]+)*/ig, function (tag) {
                    paraCount++;
                    return "<span class=" + '"' + "para" + paraCount.toString() + '"' + ">" + tag.substr(0) + "</span>";
                });
                this.spanedText.paragraphString = parser.render(text);
            });
        });
        console.log(this.spanedText.wordString);
        return this.spanedText;
    };
    return spanify;
}());
exports.spanify = spanify;
