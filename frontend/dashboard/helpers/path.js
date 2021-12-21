exports.envPath = function(host){

    let correctpath = ".env";

    if(host.includes('local')){
        correctpath = `.env.local`;
        return correctpath;
    }

    if(host.includes('kurngh3xqc')){
        correctpath = `.env.dev`;
        return correctpath;
    }

    return correctpath;
}