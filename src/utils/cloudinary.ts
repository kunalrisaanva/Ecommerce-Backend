import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"    


cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY , 
  api_secret:  process.env.API_SECRET
});


const cloudinaryUploader = async(localPath) =>{
    try {
        if(!localPath) return null
       const response = await cloudinary.uploader.upload(localPath,{
            resource_type:"auto",
            public_id:"user cover image"
        });
        fs.unlinkSync(localPath);
        return response
    } catch (error) {
        fs.unlinkSync(localPath);
       console.log("ERROR WHILE UPLOADING IMAGE ON CLOUDINARY",error)   
    }
}


export { cloudinaryUploader }

