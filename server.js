// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

const port = 8000;
app.listen(port,()=>{
    console.log(`Click: http://localhost:${port}`);
}); 

// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));
// Setup Server


// get request to send data 
app.get('/all',(req,res)=>{
    console.log('from get req: ', projectData);
    res.send(projectData);
})
// post request to store data into dic
app.post('/all',(req,res)=>{
    projectData = req.body;
    console.log('from post req: ',projectData);
})

