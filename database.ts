export class Database {

    private MongoClient = require('mongodb').MongoClient;
    private uri = "mongodb+srv://benji:U9ImnoDEW4WjZZo7@highlite-sxjre.mongodb.net/test?retryWrites=true&w=majority";
    private client;
    private collectionName : string;
    private dbName : string = "highlite";

    constructor(collectionName) {
	this.collectionName = collectionName;
	this.client = new this.MongoClient(this.uri, { useNewUrlParser: true, useUnifiedTopology: true });
	// Open up a connection to the client.
	// Open up a connection to the client.
	// The connection is asynchronous, but we can't call await directly
	// in the constructor, which cannot be async. So, we use "IIFE". Explanation below.

	/* from https://anthonychu.ca/post/async-await-typescript-nodejs/

	  Async/Await and the Async IIFE

	  The await keyword can only be used inside of a function
	  marked with the async keyword. [...] One way to do this is
	  with an "async IIFE" (immediately invoked function
	  expression)...

	   (async () => {
	   // code goes here
	   })();

	*/
	(async () => {
	    await this.client.connect().catch(err => { console.log(err); });
	})();
    }

    public async put() : Promise<void> {
	let db = this.client.db(this.dbName);
	let collection = db.collection(this.collectionName);
	let result = await collection.updateOne({'name' : 'benji'}, { $set : { 'value' : 89} }, { 'upsert' : true } );
    }

    public async get(key: string) : Promise<string> {
	let db = this.client.db(this.dbName); // this.level(this.dbFile);
	let collection = db.collection(this.collectionName);
	console.log("get: key = " + key);
	let result = await collection.findOne({'name' : key });
	console.log("get: returned " + JSON.stringify(result));
	if (result) {
	    return result.value;
	} else {
	    return null;
	}
    }

    public async del(key: string) : Promise<void> {
	let db = this.client.db(this.dbName);
	let collection = db.collection(this.collectionName);
	console.log("delete: key = " + key);
	let result = await collection.deleteOne({'name' : key });
	console.log("result = " + result);
	// await this.db.del(key);
    }

    public async isFound(key: string) : Promise<boolean>  {
	console.log("isFound: key = " + key);
	let v = await this.get(key);
	console.log("is found result = " + v);
	if (v === null) {
	    return false;
	} else {
	    return true;
	}
    }
}
