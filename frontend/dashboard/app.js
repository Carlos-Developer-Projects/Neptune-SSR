//dependencies
const exphbs = require('express-handlebars');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const { v4: uuidv4 } = require('uuid');
//helpers
const {envPath} = require("./helpers/path");

//middleware
app.use(cors());
app.use(bodyParser.json());
//public files
app.use(express.static('public'));
//render engine
app.engine('.hbs', exphbs.engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set("views", path.resolve(__dirname, "./views"));

//routes
const { routes: bindersRoutes } = require('./routes/binders');
app.use('/binders', bindersRoutes);

const { routes: userRoutes } = require('./routes/user');
app.use('/user', userRoutes);

const { routes: twitchRoutes } = require('./routes/twitch');
app.use('/twitch', twitchRoutes);

//home route
app.get('/', (req, res) => {

    //determine env
    const loadPath = envPath(req.headers.host);
    require('dotenv').config({path: loadPath});

    res.render('pages/auth', 
        {   layout : 'auth' ,
            app: process.env.APP,
            url: process.env.URL,
            client: process.env.TWITCHCLIENT,
            environment: process.env.ENVIRONMENT,
            redirect: process.env.TWITCHREDIRECT,
            assets: process.env.ASSETS,
            cdn: process.env.CDN,
            version: new Date().getTime(),
            state: uuidv4()
        }
    );
});
    
//main export
module.exports = app;