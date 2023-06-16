if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bcrypt = require('bcrypt')

// Configs


// Routers
const userRouter = require("./src/routes/user.routes")
const skillRouter = require("./src/routes/skill.routes")
const postulationsRouter = require("./src/routes/postulation.routes")


const BASE_ROUTE = "/api/v1";

// defining the Express app

const app = express();

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

const { validateJWT } = require("./src/middlewares/validateJWT.middleware")
const { validateBody } = require("./src/middlewares/validateBody.middleware")

// public routes
app.use(BASE_ROUTE, userRouter)
app.use(BASE_ROUTE, skillRouter)

// protected routes
app.use(BASE_ROUTE, postulationsRouter)

// run server
app.listen(3000, () => {
    console.log(`Example app listening on port ${3000}`)
})