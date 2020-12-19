let http = require('http');
let url = require('url');
let express = require('express');
const formidable = require('formidable');
const bodyParser = require('body-parser')
const path = require('path');
const sessions = require('express-session');
const multer = require('multer');
let fs = require('fs');
let session;
import { spanify } from './spanify';
const span = new spanify();
const upload = multer({
  dest: __dirname + "/uploads/",
  // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

export class MyServer {

    public theDatabase;
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
       this.server.use(sessions({
         secret: '*&^*^TFtgi67rf56f56^Rir56',
         resave: false,
         saveUninitialized: true
       }));
       this.server.use('/', this.router);

//getJSON ----------------------------------------------------------------

        this.router.post('/read/getJSON', async function(req, res){
          let obj = await fs.readFileSync(__dirname + '/uploads/span.json', 'utf8');

          if(obj !== null || obj !== undefined){
            res.send(JSON.parse(obj));
          }else{
            res.sendStatus(400);
          }
        });
//------------------------------------------------------------------------------

// Logout ----------------------------------------------------------------

      this.router.post('/logout', async function(req, res){
          session = undefined;
          if(session === undefined){
            res.sendStatus(200);
          }else{
            res.sendStatus(400);
          }

      });
//------------------------------------------------------------------------------

// get Sessions ----------------------------------------------------------------

      this.router.post('/getSession', async function(req, res){
        console.log(session);

          if(session === undefined){
            res.sendStatus(201);
          }else{
            res.send(session.uniqueID);
          }
      });
//------------------------------------------------------------------------------

// file drop -------------------------------------------------------------------

       this.router.post('/filedrop', upload.single("file"),(req, res) => {
         const tempPath = req.file.path;
         const targetPath = path.join(__dirname, "./uploads/sample.pdf");
         if (path.extname(req.file.originalname).toLowerCase() === ".pdf") {
           fs.rename(tempPath, targetPath, err => {
             console.log('file stored');
             span.spanify(__dirname + "/uploads/sample.pdf");
             console.log('file spanned');
           });
           res.sendStatus(200)
         } else {
           fs.unlink(tempPath, err => {
             res.status(400);
           });
         }
       });
//------------------------------------------------------------------------------

//logging in -------------------------------------------------------------------
       this.router.post('/login', async function(req, res){
         let user = req.body.user
         if(await db.isFound(user)){
           session = req.session;
           session.uniqueID = req.body.user
           res.sendStatus(200)
         }else{
           res.sendStatus(400);
         }
       });
//------------------------------------------------------------------------------

//signUp------------------------------------------------------------------------
       this.router.post('/signup', async function(req, res){
         let user = req.body.user;
         console.log(await db.isFound(user));
         if(await db.isFound(user)){
           res.sendStatus(400)
         }else{
           let setting = {
              'fontFamily' : 'Faustina, serif',
              'highlightColor': '#11b7ee',
              'backgroundColor' : '#ebdecb',
              'fontColor' : '#000000',
              'fontSize' : '20',
              'letterSpacing' : '2',
              'wordSpacing' : '5',
              'lineHeight' : '45'
           }
           let settingJSON = JSON.stringify(setting);
           await db.put({ 'user' : user, 'setting' : settingJSON});
           session = req.session;
           session.uniqueID = req.body.user;
           res.sendStatus(200)
         }
       });
//------------------------------------------------------------------------------

// save settings----------------------------------------------------------------
       this.router.post("/read/settingSave", function(req, res) {
         if(session === undefined){
           res.sendStatus(400);
         }else{
           db.update(session.uniqueID,JSON.stringify(req.body));
         }
       });
//------------------------------------------------------------------------------

// get settings-----------------------------------------------------------------
       this.router.post("/read/settingGet",async function(req, res) {
         if(session === undefined){
           let setting = {
             'fontFamily': '"Roboto Slab", serif',
             'highlightColor': '#f5e256',
             'backgroundColor': '#c0c0c0',
             'fontColor': '#242222',
             'fontSize': '34',
             'letterSpacing': '4',
             'wordSpacing': '7',
             'lineHeight': '45'
           };
           res.send(JSON.stringify(setting));
         }else{
           let setting = await db.get({'user' : session.uniqueID });
           res.send(setting.setting);
         }
       });
//------------------------------------------------------------------------------

//everything else
	     this.router.post('*', async (request, response) => {
	        response.send(JSON.stringify({ "result" : "command-not-found" }));
	     });

    }
//------------------------------------------------------------------------------

//listen------------------------------------------------------------------------
    public listen(port) : void  {
	     this.server.listen(port);
    }
}
//------------------------------------------------------------------------------
