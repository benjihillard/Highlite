'use strict';
exports.__esModule = true;
var database_1 = require("./database");
var routes_1 = require("./routes");
var theDatabase = new database_1.Database();
var theServer = new routes_1.MyServer(theDatabase);
theServer.listen(8080);
