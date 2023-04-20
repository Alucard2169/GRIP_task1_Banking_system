const { Customer } = require("./model/customerModel");
const mongoose = require("mongoose");

const getAllCustomer = async (req, res) => {
  try {
    const users = await Customer.find();

    res.status(200).json(users);
  } catch {
    (err) => {
      res.status(500).json(err);
    };
  }
};

const getCustomerById = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await Customer.findById(id);
    console.log(user);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateCustomer = async (req, res) => {
  const senderId = req.params.senderId;
  const receId = req.params.receId;
  const amountToSend = Number(req.params.amount);

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const customer = await Customer.findById(receId).lean();
    if (!customer) {
      res.status(400);
    }

    const updateOps = [
      {
        updateOne: {
          filter: { _id: receId },
          update: { $inc: { currentBalance: amountToSend } },
        },
      },
      {
        updateOne: {
          filter: { _id: senderId },
          update: {
            $inc: {
              currentBalance: -amountToSend,
              transferdMoney: amountToSend,
            },
          },
        },
      },
    ];

    await Customer.bulkWrite(updateOps, { session });
    await session.commitTransaction();

    res.status(200).json({ status: "Successful" });
  } catch (err) {
    await session.abortTransaction();
    res.status(500).json({ error: err });
  } finally {
    session.endSession();
  }
};

module.exports = { getAllCustomer, getCustomerById, updateCustomer };
