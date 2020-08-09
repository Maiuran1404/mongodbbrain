const express = require('express');
const router = express.Router();
const { isEmpty } = require('lodash');
const User = require('../models/user');
const Topic = require('../models/topic');
const TopicNote = require('../models/topicnote');


router.post('/add', async (req, res) => {
    if (isEmpty(req.body)) {
        return res.status(403).json({
            message: 'Body should not be empty',
            statusCode: 403
        });
    }
    const { name, position, company } = req.body;

    const newUser = new User({
        position,
        name,
        company,
        date: Date.now()
    });
    try {
        await newUser.save();
        res.json({
            message: 'Data successfully saved',
            statusCode: 200,
            name,
            position,
            company
        });
    } catch (error) {
        console.log('Error: ', error);
        res.status(500).json({
            message: 'Internal Server error',
            statusCode: 500
        });
    }
});


router.get('/users', async (req, res) => {

    try {
        const users = await User.find({});

        return res.json({
            users
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server error'
        });
    }
       
});


router.get('/topics', async (req, res) => {

    try {
        const topics = await TopicNote.find({});

        return res.json({
            topics
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server error'
        });
    }
       
});

router.post('/topics', async (req, res) => {

    // console.log(req.body);
    const topicNote = new TopicNote({
        topicTitle: req.body.topicTitle,
        description: req.body.description
    });
    try{
        const savedNote = await topicNote.save();
        res.json({
            message: 'Data successfully saved',
            statusCode: 200,
            topicTitle,
            description
        });
    }catch(err){
        res.json({message:err})
    }

});

//GET SPECIFIC TOPIC
router.get('/topics/:topicId', async (req, res) => {
    try{
        const topic = await TopicNote.findById(req.params.topicId);
        res.json(topic);        
    }catch(err){
        res.json({message: err})
    }

})

//GET ALL NOTES FROM TOPIC ?? It's showing as a list of each character?
router.get('/topics/:topicId/notes', async (req, res) => {
    try {
        const note = await TopicNote.findById(req.params.topicId);
        // res.json(note);
        res.json(note.notes)
    } catch(err){
        res.json({ message: err })
    }
})

//Delete TOPIC
router.delete('/topics/:topicId', async (req, res) => {
    try {
        const removedNote = await TopicNote.deleteOne({_id: req.params.topicId})
        res.json(removedNote);
    }catch(err){
        res.json({message: err})
    }    
});

//Update a TOPIC ?? Now it sets both fields even if only one is present
router.patch('/topics/:topicId', async (req, res) => {
    
    try{
        const updatedNote = await TopicNote.updateOne(
            {_id: req.params.topicId}, 
            { $set: {topicTitle: req.body.topicTitle, description: req.body.description}}
            );
        res.json(updatedNote);
    }catch(err){
        res.json({message: err})
    };  
    
})

//Push new note to topic 
router.patch('/topics/:topicId/note', async (req, res) => {
    
    try {
        const updatedNote = await TopicNote.updateOne(
            {_id: req.params.topicId},
            { $push: {
                    notes : {note: req.body.note},
                }
            }
        );

        res.json('Succesfully created new note');
    } catch(err){
        res.json({message:err})
    }
});


module.exports = router;