'use strict';

import { Database } from './database';
import { MyServer } from './routes';

const theDatabase = new Database();
const theServer = new MyServer(theDatabase);

theServer.listen(8080);

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
    if(session.uniqueID === undefined){
      let setting = {
        'fontFamily': '"Roboto Slab", serif',
        'highlightColor': '#008000',
        'backgroundColor': '#c0c0c0',
        'fontColor': '#ff8040',
        'fontSize': '34',
        'letterSpacing': '4',
        'wordSpacing': '7',
        'lineHeight': '45'
      };
      res.send(JSON.stringify(setting));
    }
   let setting = await db.get({'user' : session.uniqueID });
   res.send(setting.setting);
  });
//------------------------------------------------------------------------------
