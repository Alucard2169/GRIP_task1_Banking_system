const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    branchCode: {
        type: String,
        required: true
    },
    customerAccount: {
        type: Number,
        required: true
    },
    accountCurrency: {
        type: String,
        required: true
    },
    currentBalance: {
        type:Number,
        required: true
    },
    transferdMoney: {
        type: Number,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    serialno: {
        type: Number
    }
},{timeStamps: true})

const Customer = mongoose.model('Customer', customerSchema)
module.exports = {Customer}