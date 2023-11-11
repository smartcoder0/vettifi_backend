const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const landlordRoute = require('./routes/landlord')
const tenantRoute = require('./routes/tenants')
const loginRoute = require('./routes/login')


let port = process.env.PORT || 3000;


const app = express();
app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if(req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }

    next();
})

app.use(express.json())
app.use(express.urlencoded({extended: false}))


//API ROUTES FOR LANDLORDS
app.use('/api/landlord/', landlordRoute)

//API ROUTES FOR TENANTS
app.use('/api/tenants/', tenantRoute)

//API ROUTES FOR LOGIN
app.use('/api/login', loginRoute);

//MONGOOSE CONNECT
mongoose.connect(
    'mongodb+srv://smartcodesdev001:3iD1pLMN5pzcP0Hu@cluster0.im39q1q.mongodb.net/?retryWrites=true&w=majority',
    {
        // useNewUrlParser: true,
        // useUnifiedTopology: true
    }
).then(() => {
    app.listen(port, () => {
        console.log('Server running at: http://localhost:3000')
    })
}).catch((err) => {
    console.log(err)
})