const tenantSchema = require("../models/tenants");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const LandlordSchema = require("../models/landlord");

const JWT_SECRET = "jdfuqgwefouh@#$%jknskdjhu%$^jasbdjqd376@!%sdlfj";

//CREATE NEW TENANT
const createTenant = async (req, res) => {
  const { email, phoneNumber, nin } = req.body;

  const tenantEmail = await tenantSchema.findOne({ email }).lean();
  const tenantNumber = await tenantSchema.findOne({ phoneNumber }).lean();
  const tenantNin= await tenantSchema.findOne({ nin }).lean();

  if(tenantEmail || tenantNumber || tenantNin) {
    return res.status(409).json({ status: "error", error: "Tenant already existing" });
  } else {
    const { id } = req.params.id;

    const landlord = await LandlordSchema.findOne({ id }).lean();
    // console.log(landlord, id._id);
  
    const currentTenants = Array.from(landlord.tenants);
  
    const tenant = new tenantSchema({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      profilePic: req.body.profilePic,
      nin: req.body.nin,
      dob: req.body.dob,
      reviews: [],
      pendingPayments: [],
      propertyType: req.body.propertyType,
      leaseAmount: req.body.leaseAmount,
      leaseDuration: req.body.leaseDuration,
      paymentProof: req.body.paymentProof,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      report: req.body.report,
      status: "active",
      createdAt: req.body.createdAt,
      updatedAt: req.body.updatedAt,
    });
  
    currentTenants.unshift(tenant);
  
    const tenantUpdate = await LandlordSchema.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          tenants: currentTenants,
        },
      }
    );
  
    if (tenantUpdate) {
      tenant
        .save()
        .then(() => {
          console.log("Tenant Created Successfully");
          res
            .status(200)
            .json({ message: "Tenant Created Successfully", status: "ok" });
        })
        .catch((err) => {
          res.status(500).json({ message: err });
        });
    }
  }
};

// GET CURRENT TENANT
const getCurrentTenant = (req, res) => {
  jwt.verify(req.token, JWT_SECRET, function (err, data) {
    if (err) {
      res.status(403);
    } else {
      tenantSchema.find({ _id: req.params.id }, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: err });
        } else {
          res.status(200).json(result);
        }
      });
    }
  });
};

//GET TENANT BY NIN
const getTenantByNin = (req, res) => {
  // console.log(req.params.nin)
  jwt.verify(req.token, JWT_SECRET, function(err, data){
    if(err) {
      res.status(403).send(err.message);
    } else {
      tenantSchema.find({nin: req.query.nin})
      .exec()
      .then((result) => {
        res.status(200).json({result})
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({message: err.message})
      })
    }
  });
}

// GET ALL TENANTS

const getAllTenants = (req, res) => {

  const { nin } = req.query;

  jwt.verify(req.token, JWT_SECRET, function (err, data) {
    if (err) {
      res.status(403);
    } else {
      tenantSchema.find({}, (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: err });
        } else {
          res.status(200).json({ results });
        }
      });
    }
  });
};

module.exports = { createTenant, getCurrentTenant, getAllTenants, getTenantByNin };
