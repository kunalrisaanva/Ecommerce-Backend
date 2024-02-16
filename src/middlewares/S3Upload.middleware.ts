// import { S3Client, S3ClientConfig } from '@aws-sdk/client-s3';
// import multer from 'multer';
// import multerS3 from "multer-s3"
// import { Request } from "express"


// // Define S3 client configuration
// const s3Config: S3ClientConfig = {
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
//   },
//   region: process.env.AWS_REGION!,
// };

// // Create S3 client instance
// const s3 = new S3Client(s3Config);


// const uploadToS3 = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: process.env.S3_Bucket_name!,
//     acl: 'public-read', // Optional: Set access control list to public-read
//     key: (req: Request, file: Express.Multer.File, cb: (error: any, key?: string) => void) => {
//       cb(null, Date.now().toString() + '-' + file.originalname);
//     }
//   })
// });



// export { uploadToS3 }
