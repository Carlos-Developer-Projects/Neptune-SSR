const express = require('express');
//helpers
const {envPath} = require("../helpers/path");

const routes = express.Router({
    mergeParams: true
});

routes.get("/", async(req, res)=>{

    //determine env
    const loadPath = envPath(req.headers.host);
    require('dotenv').config({path: loadPath});

    res.render('pages/user', 
        {   layout : 'dashboard' ,
            app: process.env.APP,
            url: process.env.URL,
            client: process.env.TWITCHCLIENT,
            assets: process.env.ASSETS,
            cdn: process.env.CDN,
            version: new Date().getTime(),
            loading: `Loading user dashboard. Please wait...`
        }
    );
});

module.exports = {
    routes,
};