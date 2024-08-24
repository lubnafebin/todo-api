const express = require('express');
const Todo = require('./schema');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const todo = await Todo.find()
        if (todo) {
            res.json({ success: true, message: 'Todo successfully retreived', data: todo })
        } else {
            throw new Error('Todo fetching failed')
        }
    } catch (error) {
        res.status(500).json({ success: false, message: typeof error === 'string' ? error : 'something went wrong' })
    }

})


module.exports = router;