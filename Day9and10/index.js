const express = require("express");
/* Import MongoClient class from the mongodb  Nodejs Library  */
const { MongoClient } = require('mongodb');

const app = express();

// Middleware to parse JSON request bodies to javascript objects
app.use(express.json());

/*Setup a connection URI for a local mongodb server */
const uri = "mongodb://localhost:27017";
const dbname = "resumeData";


async function ConnectMongo(){
    /*Retuns a mongodb Client object which you use to manage the db connection*/ 
    const client = new MongoClient(uri);
    try{
        /*Connects to the mongodb server*/
        await client.connect();
        console.log("Connected to MOngoDB");

        /*Use the database */
        const db = client.db(dbname);
        const projectsCollection = db.collection("projects");

        //CREATE:POST /api/projects

        app.post('/api/projects',async(req,res)=>{
            try{
                const newProject=req.body;
                const result=await projectsCollection.insertOne(newProject);
                res.status(201).json({
                    message:"Project added successfully",
                    projectId:result.insertedId,
                });

            }catch(err){
                res.status(500).json({
                    error:"Failed to add project"
                });
            }
        });
//READ:GET /api/projects

app.get('/api/projects',async(req,res)=>{
    try{
        const projects=await projectsCollection.find().toArray();
        res.json(projects);
    }catch(err){
        res.status(500).json({error:"Failed to fetch project"});
    }
});

app.listen(3000,()=>{
    console.log("Server running on port 3000");
});

    }catch(err){
        console.error("MongoDB connection error:",err);
    }
}
 

    ConnectMongo();
    

