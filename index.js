const express = require('express');
const moment = require('moment');

const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const { Program } = require('./model');
app.use(express.json());

const connectDB = async () => {
    await mongoose.connect(`mongodb+srv://rafsunjani:hRX8BezxQgaLg8yO@rafsunprojects.inxkimj.mongodb.net/`)
    console.log(`the db is conect ${mongoose.connection.host}`)
}

connectDB()

  // Define a function to continuously update Creation_time field for each post
  async function updateCreatedAtField() {
    try {
        const posts = await Program.find();
        await Promise.all(posts.map(async post => {
            post.Creation_time.push(moment().format('hh:mm a DD.MM.YYYY'));
            await post.save();
        }));
    } catch (err) {
        console.error('Error updating Creation_time field:', err);
    }
}
setInterval(updateCreatedAtField, 30000);



async function run() {
    try {

        app.post('/create-process', async (req, res) => {
            try {
                const newProgram = new Program({
                    PID: req.body.PID,
                    Creation_time: [moment().format('hh:mm a DD.MM.YYYY')],
                });
                await newProgram.save();
        
                res.status(201).json({
                    PID: newProgram.PID,
                    Creation_time: moment(newProgram.Creation_time ).format('hh:mm a DD.MM.YYYY')
                }); 
            } catch (err) {
                console.error('Error creating Process:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            }

        })
 
        app.get('/get-all', async (req, res) => {

            try {
                const posts = await Program.find();

                const formatDate = posts.map((post) => ({
                    PID: post.PID,
                    Creation_time: post.Creation_time[0]
                }))
            
                res.json(formatDate); 
            } catch (err) {
                console.error('Error fetching Process:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        })


        app.get('/get-single/:id', async (req, res) => {
            try {
                const post = await Program.findOne(req.params.PID);
                
                if (!post) {
                    return res.status(404).json({ error: 'Process not found' });
                }
                res.json({
                    Logs: post.Creation_time
                }); 
            } catch (err) {
                console.error('Error fetching Process by PID:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });

        app.delete('/delete-process/:id', async (req, res) => {
            try {
                const deletedPost = await Program.findOneAndDelete(req.params.PID);
                if (!deletedPost) {
                    return res.status(404).json({ error: 'Process not found' });
                }
        
                res.json({ message: 'The process has been successfully deleted' });
            } catch (err) {
                console.error('Error deleting Process by PID:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });

    }
    finally {
    }

}
run().catch(console.log());




app.get('/', async(req, res) => {
    res.send('Hello server! Im find you')

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})