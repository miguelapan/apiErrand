const express = require('express')
const router = express.Router()
const Errands = require('../models/errands')

router.post('/', async (req, res) => {
    const errand = new Errands ({
            task: req.body.task,
            comments: req.body.comments,
            email: req.body.email,
            message: req.body.message
    })
    try{
        const newErrand = await errand.save()
        res.status(201).json(newErrand)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})







module.exports = router