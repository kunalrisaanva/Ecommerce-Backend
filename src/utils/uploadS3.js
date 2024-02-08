// import AWS from "aws-sdk";
// import fs from "fs"

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

import { readFileSync } from 'fs';

// Configure AWS SDK with your credentials and region
const s3Client = new S3Client({
  region: 'ap-south-1',
  credentials: {
    accessKeyId: 'AKIASXI4EMSHCG5ZQMPL',
    secretAccessKey: 'UY0D73CD3hbhu0Lj4upk4+m17M0q7Rbb6gBHa6Sd',
  },
});

// Specify your S3 bucket name and the local file path
const bucketName = 'ep-demo-1';
// const localFilePath = 'path/to/your/textfile.txt';
// const s3ObjectName = 'destination/path/in/s3/textfile.txt'; // Optional: You can specify a destination path in the S3 bucket

// Read the content of the local file as a stream
const fileUpload = (localFilePath) =>{

    const fileContent = readFileSync(localFilePath);

// Set up the S3 upload parameters
const params = {
    Bucket: bucketName,
    Key: localFilePath,
    Body: fileContent,
    // ContentType: 'img', // Adjust the content type based on your file type
  };
  
  // Upload the file to S3
  const uploadCommand = new PutObjectCommand(params);
  
  s3Client
    .send(uploadCommand)
    .then((data) => {
      console.log('File uploaded successfully. S3 Object URL:', data.Location);
    })
    .catch((err) => {
      console.error('Error uploading file to S3:', err);
    });
  
}




// const s3 = new AWS.S3({
//     accessKeyId:process.env.s3_Access_key,
//     accessKeyId:process.env.s3_secret_key
// });


// const fileUpload = (localImagePath)=> {
//     const fileContent = fs.readFileSync(localImagePath);

//     const params = {
//         Bucket:process.env.s3_Bucet_name,
//         Key:localImagePath,
//         Body:fileContent
//     }

//     s3.upload(params,function(err,data){
//         if(err){
//             throw err
//         }
//         console.log(`file uploading successfully ${data.Location}`);
//     })
// }


export {fileUpload}