const Incident = require('../models/Incident');
//const Casualty = require('../models/Casualty');


//getIncidents
const getIncidents = async (req, res) => {

    try {
        const incidents = await Incident.find({userId: req.user.id});
        res.json(incidents);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};


//addIncident
const addIncident = async (req, res) => {
    const { title, type, severity, description, location } = req.body;

    try{
        const incident = await Incident.create({ title, type, severity, description, location, userId: req.user.id });
        res.status(201).json(incident);
    } catch (error) {
        res.status(500).json({ message:error.message });
    }
};


//updateIncident
const updateIncident = async (req, res) => {
    const { title, type, severity, description, location } = req.body;

        try{
            const incident = await Incident.findById(req.params.id);
            if(!incident) return res.status(404).json({ message: 'Incident not found' });

            incident.title = title||incident.title;
            incident.type = type||incident.type;
            incident.severity = severity||incident.severity;
            incident.description = description||incident.description;
            incident.location = location||incident.location;

            const updatedIncident = await incident.save();
            res.json(updatedIncident);
        } catch (error) {
            res.status(500).json({message:error.message});
        }
};


//deleteTask
const deleteIncident = async (req, res) => {
    try{
        const incident = await Incident.findById (req.params.id);
        if(!incident) return res.status (404).json({ message: 'Incident not found' });

        await incident.remove();
        res.json ({ message:'Incident deleted' });
    } catch (error) {
    res.status(500).json({ message:error.message });
    }
};

module.exports={getIncidents, addIncident, updateIncident, deleteIncident};