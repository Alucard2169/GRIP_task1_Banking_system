const express = require('express');
const app = express();
require('dotenv').config();
const { Customer } = require('./model/customerModel');
const mongoose = require('mongoose');
const apicache = require('apicache')
let cache = apicache.middleware;
const path = require('path')

const PORT = process.env.PORT || 8000;


app.use(express.urlencoded({ extended: true }));




app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(path.join(__dirname+'/public')))



const URL = process.env.DB_CONNECTION_STRING;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
   return app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
})
    })
    .catch((err) => {
    return console.log(err)
})




app.get('/', (req, res) => {
    res.redirect('/api')
})


// get all customers
app.get('/api',  cache('2 minutes'), (req, res) => {
    Customer.find()
        .then((result) => {
            return res.send(result)
        })
        .catch(err=> {
        return console.log(err)
        })
})


// get customers by id
app.get('/api/all/:id', cache('2 minutes'), (req, res) => {
    const id = req.params.id;
    Customer.findById(id)
        .then((result) => {
           return res.send(result)
        })
        .catch((err) => {
           return console.log(err)
        })
})




// update customers by id
app.put('/api/choose/:senderId/:receId/:amount',cache('2 minutes'),async (req, res) => {
    const senderId = req.params.senderId;
    const receId = req.params.receId;
    const amountToSend = Number(req.params.amount);

    
    const customer = await Customer.findById(receId)
    if (!customer) {
        res.status(400)
    }
    await Customer.findByIdAndUpdate(receId, { $inc: { currentBalance: amountToSend } })
    await Customer.findByIdAndUpdate(senderId, {$inc:{ currentBalance: -amountToSend}})
    await Customer.findByIdAndUpdate(senderId, {$inc:{ transferdMoney: amountToSend}})
    res.status(200).send({status: "Successful"})

})

