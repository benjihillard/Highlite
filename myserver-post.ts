let http = require('http');
let url = require('url');
let express = require('express');

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
	     this.server.use('/', express.static('./login'));
       this.server.use('/read', express.static('./read'));
       this.server.use(express.json());
       this.server.use('/', this.router);

       this.server.get('/read',function(req,res) {
         res.render('index');
       });


       this.router.post('/filedrop', function(req, res){
         console.log(req);

         return res.redirect('./read');
       });
       this.router.post('/login', function(req, res){

       });
	     this.router.post('*', async (request, response) => {
	        response.send(JSON.stringify({ "result" : "command-not-found" }));
	     });
	// Start up the counter endpoint at '/counter'.
    }

    public listen(port) : void  {
	     this.server.listen(port);
    }
}
