const express = require("express");
/* Import MongoClient class from the mongodb  Nodejs Library  */
const { MongoClient, ObjectId } = require('mongodb');

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


app.put('/api/projects/:id',async(req,res)=>{
    try{
        const{id}=req.params;
        const upDatedproject=req.body;

        //Convert id(string) into ObjectId
        const result=await projectsCollection.updateOne({
            _id:new ObjectId(id)
        },
        {$set:upDatedproject}
    );

    if(result.matchedCount===0){
        return res.status(400).json({error:"Project Not Found"});
    }

    res.json({message:"Project Added Successfully"});
}catch(err){
    res.status(500).json({error:"Failed to update project"});
}
});


app.delete('/api/projects/:id',async (req,res)=>{
    try{
    const {id}=req.params;

    const result=await projectsCollection.deleteOne({
        _id:new ObjectId(id),
    });

    if(result.deletedCount===0){
        return res.status(404).json({error:"Project not found"});
    }

    res.status(204).send(); //204 - No Content
    }catch(err){
        res.status(400).json({error:"Invalid Project ID"});
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
    

