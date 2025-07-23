const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const todoModel = require('./Models/todo');

dotenv.config(); // Load .env variables

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB error:', err));

// Add Todo
app.post('/add', (req, res) => {
    const task = req.body.task;
    todoModel.create({ task: task })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

// Get Todos
app.get('/get', (req, res) => {
    todoModel.find()
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

// Update Todo
app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    todoModel.findByIdAndUpdate({ _id: id }, { done: true })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

app.get('/test-mongo', async (req, res) => {
    try {
        const mongooseState = mongoose.connection.readyState;
        if (mongooseState === 1) {
            res.send('✅ MongoDB is connected');
        } else {
            res.send('❌ MongoDB not connected');
        }
    } catch (err) {
        res.status(500).send('❌ Error testing MongoDB connection');
    }
});

// Delete Todo
app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    todoModel.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
