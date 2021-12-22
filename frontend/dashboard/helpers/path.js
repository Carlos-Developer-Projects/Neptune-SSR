exports.envPath = function(host){

    let correctpath = ".env";

    if(host.includes('local')){
        correctpath = `.env.local`;
        return correctpath;
    }

    if(host.includes('kurngh3xqc') || host.includes('preview-dashboard')){
        correctpath = `.env.dev`;
        return correctpath;
    }

    return correctpath;
}