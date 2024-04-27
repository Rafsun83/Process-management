
// Example controller function
const { Program } = require('../model/processModel');
const moment = require('moment');
const getAllprocessController = async (req, res) => {
    
    try {
        const process = await Program.find();

        const formatDate = process.map((post) => ({
            PID: post.PID,
            Creation_time: post.Creation_time[0]
        }))
    
        res.json(formatDate); 
    } catch (err) {
        console.error('Error fetching Process:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const postProcessController = async (req, res) => {
    try {
        const newProgram = new Program({
            PID: req.body.PID,
            Creation_time: [moment().format('hh:mm a DD.MM.YYYY')],
        });
        await newProgram.save();

        res.status(201).json({
            PID: newProgram.PID,
            Creation_time: moment().format('hh:mm a DD.MM.YYYY')
        }); 
    } catch (err) {
        console.error('Error creating Process:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }

  };

  const getSingleProcessController = async (req, res) => {
    try {
        const {pid} = req.params
        const process = await Program.findOne({PID: pid});
        if (!process) {
            return res.status(404).json({ error: 'Process not found' });
        }
        res.json( {
            Logs: process.Creation_time
        } );
       
    } catch (err) {
        console.error('Error fetching Process by PID:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }

  };

  const deleteProcessController = async (req, res) => {
    try {
        const {pid} = req.params
        
        const deletedProcess = await Program.findOneAndDelete({PID: pid});
        if (!deletedProcess) {
            return res.status(404).json({ error: 'Process not found' });
        }
        res.json({ message: 'The process has been successfully deleted' });
    } catch (err) {
        console.error('Error deleting Process by PID:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }

  };
  
  module.exports = {getAllprocessController , postProcessController, getSingleProcessController, deleteProcessController};
  