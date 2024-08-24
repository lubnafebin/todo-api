const express = require('express');
const Todo = require('./schema');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const todo = await Todo.find()
        if (todo) {
            const data = { todo: [], completed: [] }
            todo.forEach((item) => {
                if (item.status) {
                    data.completed.push(item)
                } else {
                    data.todo.push(item)
                }
            })
            res.json({ success: true, message: 'Todo successfully retreived', data: data })
        } else {
            throw 'Todo fetching failed'
        }
    } catch (error) {
        res.status(500).json({ success: false, message: typeof error === 'string' ? error : 'something went wrong' })
    }

})

router.post('/create', async (req, res) => {
    try {
        if (req.body?.description) {
            const todo = await Todo.create(req.body);
            res.json({ success: true, message: 'successfully created', data: todo })
        } else {
            res.status(400).json({ success: false, message: 'description property is missing', data: null })
        }
    } catch (error) {
        res.status(500).json({ success: false, message: typeof error === 'string' ? error : 'something went wrong' })

    }
})

router.delete('/:todoId/delete', async (req, res) => {
    try {
        const todoId = req.params.todoId
        const todo = await Todo.deleteOne({ _id: todoId });
        console.log(todo);
        if (todo.acknowledged && todo.deletedCount === 1) {
            res.json({ success: true, message: 'successfully deleted', data: todo })
        } else {
            res.status(404).json({ success: false, message: 'Todo not found' })
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'something went wrong' })
    }

})

router.put('/:todoId/update', async (req, res) => {
    try {
        const todoId = req.params.todoId
        if (req.body?.description || typeof req.body?.status === 'boolean') {

            const todo = await Todo.updateOne({ _id: todoId }, { $set: req.body });
            if (todo.acknowledged && todo.modifiedCount != 0) {
                res.json({ success: false, message: 'todo successfully updated', data: todo })
            } else {
                res.status(400).json({ success: false, message: 'todo not updated', data: todo })
            }
        } else {
            res.status(404).json({ success: false, message: 'descrition or status not found' })
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'something went wrong', error })
    }
})







module.exports = router;