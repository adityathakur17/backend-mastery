import express from "express";

const app = express();

const port = 3000;

app.use(express.json())

let teaData = [];
let nextId= 1;

//add new tea
app.post("/teas", (req, res) => {

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
