const express = require('express');
const app = express();

const projects = [
    {
     id: 1,
     name: "Portfolio Website",
     description: "Built using HTML, CSS, JS" 
    },

    {
     id: 2,
     name: "Weather App",
     description: "Displays live weather data using an API" 
    },

    {
     id: 3, 
     name: "Task Manager", 
     description: "CRUD app with Node.js and Express" 
    }
];

const experience = [
    { 
     id: 1, 
     role: "Software Intern", 
     company: "Tech Corp", duration: 
     "3 months" 
    },

    {
     id: 2,
     role: "Freelance Developer", 
     company: "Self-Employed", 
     duration: "6 months" 
    }
];

app.get('/api/project',(req,res)=>{
    res.json(projects);
})

app.get('/api/project/:id',(req,res)=>{
    const {id}=req.params;
    const project = projects.find(p=>p.id===parseInt(id))

    if(project){
        res.json(project)
    }
    else{
        res.status(404).json({error:"Project Not Found"})
    }
})

app.get('/api/experience',(req,res)=>{
    res.json(experience)
})
app.listen(3000, () => {
    console.log("Listening on port 3000");
})