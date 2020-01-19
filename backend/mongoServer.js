require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const SchemaFarm = require('./SchemaFarm');
const path = require('path');
const app = express();
const router = express.Router();
const MongoPORT = process.env.MongoPORT || 5000
app.use(cors());
// connects our back end code with the database
mongoose.connect('mongodb+srv://iflukej:Ff0813780670@smartfarm-euxel.gcp.mongodb.net/test?retryWrites=true&w=majority/SmartFarm', { useNewUrlParser: true , useUnifiedTopology: true });

let db = mongoose.connection;

db.once('open', () => console.log('MongoDB_API Connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// this is our get method
// this method fetches all available data in our database
router.get('/getData', async (req, res) => {
    let getData = await SchemaFarm.find()
    await res.status(200).json(getData)
})

// this is our update method
// this method overwrites existing data in our database
router.post('/updateData', (req, res) => {
    const { id, update } = req.body;
    SchemaFarm.findByIdAndUpdate(id, update, (err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

// this is our delete method
// this method removes existing data in our database
router.delete('/deleteData', async (req, res) => {
    let deleteIndex = await req.body.params
    await SchemaFarm.deleteOne({ id: deleteIndex })
    await res.status(200).json({ status: "success" })
});

// this is our create methid
// this method adds new data in our database
router.post('/addData', async (req, res) => {
    try {
        let getList = await SchemaFarm.find()
        let getCurrentId = await getList.map((id) => { return id.id })
        let CurrentId = await Math.max.apply(null, getCurrentId)
        if (CurrentId == -Infinity)
            CurrentId = 0
        else
            CurrentId++
        let JsonData = await req.body.data
        let date = await new Date()
        let addData = await new SchemaFarm({ id: CurrentId, data: JsonData, date: date })
        await addData.save()
        await res.status(200).json({ status: "success" })
    } catch (err) {
        res.status(400).json({ status: "Cannot insert data : " + err })
    }
});

router.post('/button', (req, res) => {
    SendSw.sendBtSwToLine(req.body.command)
})

if (process.env.NODE_ENV === 'production') {
    app.use(express.static("client/build/"))
    app.get('*', function (req, res) {
        res.sendFile(path.resolve(__dirname + 'client', 'build', 'index.html'));
    });
}

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(MongoPORT, () => console.log(`MongoDB API Start On ${MongoPORT}`));
