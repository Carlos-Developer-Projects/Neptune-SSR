//dependencies
const fs = require('fs');

//aws services
const AWS = require("aws-sdk");
const cloudfront = new AWS.CloudFront();
const s3 = new AWS.S3();

//file list from json file
const files = require("./files.json");

const upload_and_clear = async()=>{

    let upload_queue = [];

    try{

        console.log(`Attempting to upload and clear cache.`);

        //read the files
        files.list.forEach((file)=>{
            if(file.upload){
                upload_queue.push({...file, data: fs.readFileSync(file.location)});
            }
        });

        //upload the files and clear their cache
        upload_queue.forEach(async (file)=>{

            //declaring parameters for S3 upload
            let s3_params = { 
                Bucket: file.bucket,
                Key: `${file.key}${file.name}`,
                Body: file.data,
                ContentType: file.type, 
                ACL: 'public-read'
            };

            //declaring parameters for Cloudfront cache clear
            let cloudfront_params = {
                DistributionId: file.cloudfrontID,
                InvalidationBatch: {
                  CallerReference: ''+(new Date().getTime()),
                  Paths: {
                    Quantity: 1,
                    Items: [
                        `/${file.key}${file.name}`
                    ]
                  }
                }
            };

            try{
                console.log("sending to s3");
                await s3.putObject(s3_params).promise();
                
                if(file.cloudfrontID !== "" && file.cache === true){
                    console.log("sending to cloudfront for cache clearing");
                    await cloudfront.createInvalidation(cloudfront_params).promise();
                }

                console.log(`${file.name} was uploaded`);
            }catch(e){
                console.log(`File ${file.name} could not be uploaded`);
                console.log(e);
            }
        
        });

    }catch(e){
        console.log("An error occured.");
        console.log(e);

        return;
    }

};

upload_and_clear();