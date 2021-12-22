const express = require('express');
//helpers
const {envPath} = require("../helpers/path");

const routes = express.Router({
    mergeParams: true
});

routes.get("/new", async(req, res)=>{

    //determine env
    const loadPath = envPath(req.headers.host);
    require('dotenv').config({path: loadPath});

    res.render('pages/binders_create', 
        {   layout : 'dashboard' ,
            app: process.env.APP,
            url: process.env.URL,
            client: process.env.TWITCHCLIENT,
            assets: process.env.ASSETS,
            cdn: process.env.CDN,
            version: new Date().getTime(),
            loading: `Loading binder editor. Please wait...`
        }
    );
});

routes.get("/", async(req, res)=>{

    //determine env
    const loadPath = envPath(req.headers.host);
    require('dotenv').config({path: loadPath});

    res.render('pages/binders_manage', 
        {   layout : 'dashboard' ,
            app: process.env.APP,
            url: process.env.URL,
            client: process.env.TWITCHCLIENT,
            assets: process.env.ASSETS,
            cdn: process.env.CDN,
            version: new Date().getTime(),
            loading: `Loading your binders. Please wait...`
        }
    );
});

module.exports = {
    routes,
};