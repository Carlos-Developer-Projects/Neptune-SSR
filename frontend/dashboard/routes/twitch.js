const express = require('express');
//helpers
const { envPath } = require("../helpers/path");
const { getToken, findUser } = require("../helpers/twitch");

const routes = express.Router({
    mergeParams: true
});

routes.get('/', (req, res) => {

    //determine env
    const loadPath = envPath(req.headers.host);
    require('dotenv').config({path: loadPath});

    res.render('pages/twitch', 
        {   layout : 'auth' ,
            app: process.env.APP,
            url: process.env.URL,
            client: process.env.TWITCHCLIENT,
            environment: process.env.ENVIRONMENT,
            redirect: process.env.TWITCHREDIRECT,
            assets: process.env.ASSETS,
            cdn: process.env.CDN,
            version: new Date().getTime()
        }
    );
});

routes.get("/user", async(req, res)=>{

    //determine env
    const loadPath = envPath(req.headers.host);
    require('dotenv').config({path: loadPath});

    const code = req.query.code;

    if(!code){
        res.json({
            status: "error"
        })
    }

    //find twitch user
    const response = await getToken(code, process.env.TWITCHCLIENT, process.env.TWITCHAPI, process.env.TWITCHREDIRECT);

    //check if user is in our system and return them
    if(response.data && response.data.access_token){
        res.json(response.data);
    }else{
        res.json({
            status: "error"
        })
    }

});

routes.post("/dashboard", async(req, res)=>{

    //determine env
    const loadPath = envPath(req.headers.host);
    require('dotenv').config({path: loadPath});

    const theBody = req.body;

    if(!theBody.access_token){
        res.json({
            status: "error"
        })
    }

    const twitchResponse = await findUser(theBody.access_token, process.env.TWITCHCLIENT);

    console.log(twitchResponse);

    res.json({
        status: 'success',
        content: twitchResponse
    })

});

module.exports = {
    routes,
};