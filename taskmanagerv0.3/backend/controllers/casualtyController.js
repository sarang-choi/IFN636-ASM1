//const Incident = require('../models/Incident');
const Casualty = require('../models/Casualty'); 


//getCasualties
const getCasualties = async (req, res) => {

    try {
        const casualties = await Casualty.find({userId: req.user.id});
        res.json(casualties);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};


//addCasualty
const addCasualty = async (req, res) => {
    const { incidentId, name, age, gender, condition, notes } = req.body;

    try{
        const casualty = await Casualty.create({ incidentId, name, age, gender, condition, notes, userId: req.user.id });
        res.status(201).json(casualty);
    } catch (error) {
        res.status(500).json({ message:error.message });
    }
};


//updateCasualty
const updateCasualty = async (req, res) => {
    const { incidentId, name, age, gender, condition, notes } = req.body;

        try{
            const casualty = await Casualty.findById(req.params.id);
            if(!casualty) return res.status(404).json({ message: 'Casualty not found' });

            casualty.incidentId = incidentId||casualty.incidentId;
            casualty.name = name||casualty.name;
            casualty.age = age||casualty.age;
            casualty.gender = gender||casualty.gender;
            casualty.condition = condition||casualty.condition;
            casualty.notes = notes||casualty.notes;

            const updatedCasualty = await casualty.save();
            res.json(updatedCasualty);
        } catch (error) {
            res.status(500).json({message:error.message});
        }
};


//deleteCasualty
const deleteCasualty = async (req, res) => {
    try{
        const casualty = await Casualty.findById (req.params.id);
        if(!casualty) return res.status (404).json({ message: 'Casualty not found' });

        await casualty.remove();
        res.json ({ message:'Casualty deleted' });
    } catch (error) {
    res.status(500).json({ message:error.message });
    }
};

module.exports={getCasualties, addCasualty, updateCasualty, deleteCasualty};