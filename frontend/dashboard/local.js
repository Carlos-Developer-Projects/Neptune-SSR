const port = 8090;
const app = require('./app');

const server = app.listen(port, function () {   
    console.log(`Creator app listening at port:${port}`);
});

