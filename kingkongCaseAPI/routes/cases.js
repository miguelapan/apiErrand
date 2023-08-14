const express = require('express')
const router = express.Router()
const Errands = require('../models/errands')

router.get('/', async (req, res) => {
    try{
        const errand = await Errands.find()
        res.json(errand)
    }catch(err){
        res.json({message: err.message})
    }
})

router.get('/:id', async (req, res) => {
    try{
        const errand = await Errands.findById(req.params.id)
        res.json(errand)
    }catch(err){
        res.json({message: err.message})
    }
})


router.patch('/:id', async (req, res) => {
    const errand = await Errands.findById(req.params.id)
    if(req.body.task !== null){
        errand.task = req.body.task
    }
    if(req.body.completed !== null){
        errand.completed = req.body.completed
    }
    if(req.body.comments !== null){
        errand.comments = req.body.comments
    }
     if(req.body.status !== null){
        errand.status = req.body.status
    }
    try{
        const updatedErrand = await errand.save()
        res.json(updatedErrand)
    }catch(err){
        res.json({message: err.message})
    }
})

router.delete('/:id', async (req, res) => {
    try{

        const errand = await Errands.findById(req.params.id)
        if(errand == null){
            return res.status(500).json({message: "no errand with this id"})
        }
        errand.deleteOne()
        res.json({message: "deleted"})

    }catch(err){
        res.json({message: err.message})
    }
})



module.exports = router