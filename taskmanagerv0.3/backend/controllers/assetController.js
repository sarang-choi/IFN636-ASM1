const Asset = require('../models/Asset');


//getAssets
const getAssets = async (req, res) => {

    try {
        const assets = await Asset.find({userId: req.user.id});
        res.json(assets);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};


//addAsset
const addAsset = async (req, res) => {
    const { name, type, capacity, status, notes } = req.body;

    try{
        const asset = await Asset.create({ name, type, capacity, status, notes, userId: req.user.id });
        res.status(201).json(asset);
    } catch (error) {
        res.status(500).json({ message:error.message });
    }
};


//updateAsset
const updateAsset = async (req, res) => {
    const { name, type, capacity, status, notes } = req.body;

        try{
            const asset = await Asset.findById(req.params.id);
            if(!asset) return res.status(404).json({ message: 'Asset not found' });

            asset.name = name||asset.name;
            asset.type = type||asset.type;
            asset.capacity = capacity||asset.capacity;
            asset.status = status||asset.status;
            asset.notes = notes||asset.notes;

            const updatedAsset = await asset.save();
            res.json(updatedAsset);
        } catch (error) {
            res.status(500).json({message:error.message});
        }
};


//deleteAsset
const deleteAsset = async (req, res) => {
    try{
        const asset = await Asset.findById (req.params.id);
        if(!asset) return res.status (404).json({ message: 'Asset not found' });

        await asset.remove();
        res.json ({ message:'Asset deleted' });
    } catch (error) {
    res.status(500).json({ message:error.message });
    }
};

module.exports={getAssets, addAsset, updateAsset, deleteAsset};