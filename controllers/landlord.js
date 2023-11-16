const LandlordSchema = require("../models/landlord");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "jdfuqgwefouh@#$%jknskdjhu%$^jasbdjqd376@!%sdlfj";

//REGISTER NEW LANDLORD

const createLandlord = async (req, res) => {
  const { email, phoneNumber } = req.body;

  const landlordEmail = await LandlordSchema.findOne({ email }).lean();
  const landlordNumber = await LandlordSchema.findOne({ phoneNumber }).lean();

  if (landlordEmail || landlordNumber) {
    return res.json({ status: "error", error: "User already extisting" });
  } else {
    const password = await bcrypt.hash(req.body.password, 10);

    const landlord = new LandlordSchema({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      password: password,
      tenants: [],
      history: [],
      createdAt: String(Date.now()),
      updatedAt: String(Date.now()),
    });

    landlord
      .save()
      .then(() => {
        console.log("Landlord Created");
        res.status(200).json({ message: "Landord created", status: "ok" });
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  }
};

//GET CURRENT LANDLORD

const getCurrentLandLord = (req, res) => {
  jwt.verify(req.token, JWT_SECRET, function (err, data) {
    if (err) {
      res.status(403).send(err.message);
    } else {
      LandlordSchema.find({ _id: req.params.id })
      .exec()
      .then((result) => {
        res.status(200).json({ result })
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: err.message })
      })
    }
  });
};

//GET ALL LANDLORDS

const getAllLandlords = (req, res) => {
  jwt.verify(req.token, JWT_SECRET, function (err, data) {
    if (err) {
      res.status(403).send(err.message); // Send error message in the response
    } else {
      LandlordSchema.find({})
        .exec() // Execute the query
        .then((results) => {
          res.status(200).json({ results });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ message: err.message });
        });
    }
  });
};

module.exports = { createLandlord, getCurrentLandLord, getAllLandlords };
