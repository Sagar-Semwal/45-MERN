/* Import MongoClient class from the mongodb  Nodejs Library  */
const { MongoClient } = require('mongodb');

/*Setup a connection URI for a local mongodb server */
const uri = "mongodb://localhost:27017";
const dbname = "resumeData";


async function ConnectMongo(){
    /*Retuns a mongodb Client object which you use to manage the db connection*/ 
    const client = new MongoClient(uri);
    try{
        /*Connects to the mongodb server*/
        await client.connect();

        /*Use the database */
        const db = client.db(dbname);

        // Create a collection to ensure db is visible 
        await db.createCollection("resumes");
        console.log("Connection Successful to MongoDb . Created database 'resumeData' ");
    } catch(err){
        console.log("Error:",err);

    }
    finally{
        await client.close();
    }

    }

    ConnectMongo();

