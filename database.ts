export class Database {


  private MongoClient = require('mongodb').MongoClient;
  private uri = "mongodb+srv://benji:Highlite88@cluster0-iqtnz.mongodb.net/test?retryWrites=true&w=majority";
  private client;
  private collection;

  constructor() {
    this.client = new this.MongoClient(this.uri, { useNewUrlParser: true, useUnifiedTopology: true });
    this.client.connect(err => {
      this.collection = this.client.db("test").collection("devices");
    });
  }
//------------------put -------------------------------------------------------------------------
   public async put(x) : Promise<void> {
      await this.collection.insertOne(x);
   }
//--------------------------------------------------------------------------------------------------

// update ---------------------------------------------------------------------------------------------


// ------------------------------------------------------------------------------------------------------

// get----------------------------------------------------------------------------------------------------


  //----------------------------------------------------------------------------------------------------------

  // isfound-----------------------------------------------------------------------------------------------

   public async isFound(user) : Promise<boolean> {
      let result = await this.collection.findOne({user : user});
      if (result === null) {
    	    return false;
    	} else {
    	    return true;
    	}
    }
//--------------------------------------------------------------------------------------------------------

}
