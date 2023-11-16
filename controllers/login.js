const landlordSchema = require('../models/landlord')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'jdfuqgwefouh@#$%jknskdjhu%$^jasbdjqd376@!%sdlfj';

const loginController = async (req, res) => {
    const {email, password} = req.body;

    const landlord = await landlordSchema.findOne({email}).lean();

    if(landlord) {
        if(await bcrypt.compare(password, landlord.password)) {
            const token = jwt.sign({
                id: landlord._id,
                email: landlord.email
            },
            JWT_SECRET
            )
            return res.json({ status: 'ok', data: token, role: 'landlord', data: landlord})
        } else {
            return res.json({ status: 'error', error: 'Incorrect email or password'})
        }
    }
    res.json({status: 'error', error: 'User does not exist'})
}

module.exports = {loginController}