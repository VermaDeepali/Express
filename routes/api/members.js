const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const members = require('../../Members');

//Gets all members
router.get('/', (req, res)=> {
    res.json(members);
})

//Get a member
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found){
        res.json(members.filter(member =>  member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `Member not found with the id ${req.params.id}`});
    }
    
});

// Create a member
router.post('/', (req, res)=>{
    const newMember ={
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if(!newMember.name || !newMember.email){
        return res.status(400).json({ msg: 'Please include name and email'})
    } 

    // members.save(newMember) used for saving data in a DB
    members.push(newMember);
    res.send(members)
})

// Update a member
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found){
        const updateMember = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)){
                member.name = updateMember.name? updateMember.name: member.name;
                member.email = updateMember.email? updateMember.email: member.email;

                res.json({ msg: 'MEmber updated', member})
            }
        });
    } else {
        res.status(400).json({ msg: `Member not found with the id ${req.params.id}`});
    }
    
});

// Delete member
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found){
        res.json({msg: 'Member Deleted', 
        members: members.filter(member =>  member.id !== parseInt(req.params.id))
    });
    } else {
        res.status(400).json({ msg: `Member not found with the id ${req.params.id}`});
    }
    
});


module.exports = router;