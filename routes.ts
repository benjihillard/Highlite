let http = require('http');
let url = require('url');
let express = require('express');
const formidable = require('formidable');
const bodyParser = require('body-parser')
const path = require('path');
import { spanify } from './spanify';
const span = new spanify();

export class MyServer {

    private theDatabase;

    // Server stuff: use express instead of http.createServer
    private server = express();
    private port = 8080;
    private router = express.Router();


    constructor(db) {
	     this.theDatabase = db;
	     this.router.use((request, response, next) => {
	       response.header('Content-Type','application/json');
	       response.header('Access-Control-Allow-Origin', '*');
	       response.header('Access-Control-Allow-Headers', '*');
	       next();
	     });
       this.server.use('/',express.static('./login'));
       this.server.use('/read',express.static('./read'));
       this.server.use(bodyParser.urlencoded({extended : false}));
       this.server.use(bodyParser.json());
       this.server.use('/', this.router);


       this.router.post('/filedrop',async function(req, res){
         var form = new formidable.IncomingForm();
         form.parse(req);
         form.on('fileBegin', function (name, file){
           file.path = __dirname + '/uploads/' + file.name;
           console.log(span.spanify(file.path).wordString);

         });
         res.send(200);
       });
       //logging in
       this.router.post('/login', function(req, res){
         if(req.body.userName === 'bhillard@umass.edu'){
           res.send(200);
         }else{
           res.send(400)
         }
       });

       //signUp
       this.router.post('/signup', async function(req, res){
         if(req.body.userName === 'bhillard@umass.edu'){
           res.send(200);
         }else{
           res.send(400);
         }
       });

       // save settings
       this.router.post("/read/settingSave", function(req, res) {
         console.log(req.body);
         res.send(200);
       });

       //everything else
	     this.router.post('*', async (request, response) => {
	        response.send(JSON.stringify({ "result" : "command-not-found" }));
	     });

    }

    public listen(port) : void  {
	     this.server.listen(port);
    }
}
