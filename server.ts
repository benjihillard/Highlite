'use strict';

import { Database } from './database';
import { MyServer } from './routes';

const theDatabase = new Database();
const theServer = new MyServer(theDatabase);

theServer.listen(8080);
