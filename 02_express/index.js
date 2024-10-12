import express from "express";
import 'dotenv/config'
import logger from "./logger.js";
import morgan from "morgan";

const app = express();
const port = process.env.PORT ||3000;
app.use(express.json())

const morganFormat = ":method :url :status :response-time ms";

app.use(
    morgan(morganFormat, {
      stream: {
        write: (message) => {
          const logObject = {
            method: message.split(" ")[0],
            url: message.split(" ")[1],
            status: message.split(" ")[2],
            responseTime: message.split(" ")[3],
          };
          logger.info(JSON.stringify(logObject));
        },
      },
    })
  );

let teaData = [];
let nextId= 1;

//add new tea
app.post("/teas", (req, res) => {
  logger.warn("A post request was made")  
  const { name, price } = req.body;
  const newTea = { id: nextId++, name, price };
  teaData.push(newTea);
  res.status(201).send(newTea);
});

//list teas
app.get("/teas", (req,res)=>{
    res.status(201).send(teaData)
})

//list teas by id
app.get('/teas/:id', (req,res)=>{
    const teadId = req.params.id

    const tea = teaData.find((t)=> t.id === parseInt(req.params.id))

    if(!tea){
        res.status(404).send("tea not found ")
    }

 

    res.status(200).send(tea)
})

//update teas
app.put('/teas/:id', (req,res)=>{

    const tea = teaData.find((t)=> t.id === parseInt(req.params.id))

    if(!tea){
        res.status(404).send("tea not found ")
    }

    const {name,price} = req.body;
    tea.name = name;
    tea.price = price;

    res.status(200).send(tea)
})

//delete tea
app.delete('/teas/:id', (req,res)=>{
    const index = teaData.indexOf(t => t.id === req.params.id)
    if(index === 1){ 
        return res.status(404).send("Not found")
    }
    teaData.splice(index,1);
    return res.status(204).send("deleted")
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
