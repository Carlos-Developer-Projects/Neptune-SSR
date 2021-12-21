const express = require('express');
//helpers
const {envPath} = require("../helpers/path");

const routes = express.Router({
    mergeParams: true
});

module.exports = {
    routes,
};