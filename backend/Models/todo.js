const mongoose = require ('mongoose')

const todoschema = new mongoose.Schema ({
    task:String,
    done:{
        type:Boolean,
        default:false
    }
})

const todoModel =  mongoose.model("todos" , todoschema)


module.exports = todoModel
