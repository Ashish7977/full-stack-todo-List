const express = require ('express')
const mongoose = require ('mongoose')
const cors = require ('cors')
const app = express()
const todoModel = require('./Models/todo')
app.use(cors())
app.use(express.json())


mongoose.connect('mongodb://127.0.0.1:27017/test').then(()=> console.log('mongodb connected')).catch((err)=> console.log(err))

app.listen(process.env.PORT || 3000 , ()=>{
    console.log('server  is  running')
})                                   


app.post('/add' , (req,res ) =>{
 const task = req.body.task
 todoModel.create({task:task}).then(result => res.json(result)).catch((err)=> res.json(err))
 console.log(task)
})

app.put('/update/:id' , (req,res)=>{
    const {id}= req.params
    todoModel.findByIdAndUpdate({_id:id},{done:true}).
    then(result=>res.json(result)).
    catch((err)=>res.json(err))

})

app.get('/get',(req,res) =>{
    todoModel.find().then(result=>res.json(result)).catch((err)=>res.json(err))
 })

 app.delete('/delete/:id',(req,res)=>{
    const {id}= req.params
    todoModel.findByIdAndDelete({_id:id}).
    then(result=>res.json(result)).
    catch((err)=>res.json(err))

 })




