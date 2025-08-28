import { v2 } from "cloudinary";
import fs from "fs";


cloudinary.config({
    cloud_name: process.env.cloudinary_cloud_name ,
    api_key: process.env.cloudinary_api_key ,
    api_secret: process.env.cloudinary_api_secret 
});

const uploadOnCloudinary=async (localFilePath) => {

    try
    {
        if(!localFilePath) return null;

      const response= await cloudinary.v2.uploader
       .upload(localFilePath,
         {
               resource_type: "auto",
           }
       )
       console.log("file is uploaded on cloudinary",response.url);
         return response;
    }
       catch(error) {
           fs.unlinkSync(localFilePath);
           return null;
       };
    
}
export  {uploadOnCloudinary};