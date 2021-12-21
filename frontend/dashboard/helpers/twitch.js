const axios = require('axios').default;

exports.getToken = async(code, client, api, reroute)=>{
    const query = `https://id.twitch.tv/oauth2/token?client_id=${client}&client_secret=${api}&code=${code}&grant_type=authorization_code&redirect_uri=${reroute}`;

    let response = null;

    try{
        response = await axios.post(query);
        return response;
    }catch(e){
        console.log(e.response.data);
        response = "An error occured";
        return response;
    }

};

exports.findUser = async(token, client)=>{

    let response = null;

    try{
        response = await axios.get('https://api.twitch.tv/helix/users', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Client-Id': client
            }
        });

        if(response.data.data && response.data.data[0].id){
            return response.data.data[0];
        }

    }catch(e){
        console.log(e.response.data);
        response = "An error occured";
        return response;
    }
};

exports.checkToken = ()=>{

};