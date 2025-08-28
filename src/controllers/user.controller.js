import asyncHandler from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/User.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = asyncHandler(async (req, res) => {
  
const {fullName,email,username,password}=req.body
console.log("email",email);

if([fullName,email,username,password].includes("")) {
    throw new ApiError(400,"All fields are required");
   
}  

const existedUser = User.findOne({$or:[{email},{username}]})

if(existedUser){
    throw new ApiError(409,"User already exists with this email or username");
}

const avatarLocalPath =req.files?.avatar[0]?.path  ;
const coverImageLocalPath =req.files?.coverImage[0]?.path;

if(!avatarLocalPath )
    {
        throw new ApiError(400,"Avatar is required");
    }

   const avatar =await uploadOnCloudinary(avatarLocalPath);
    const coverImage =await uploadOnCloudinary(coverImageLocalPath);
    if(!avatar)
        {
            throw new ApiError(500,"Failed to upload avatar");
        }

       const user= await User.create({
            fullName,
            avatar: avatar.url,
            coverImage: coverImage?.url || "",
        email,
        username:username.toLowerCase(),
        password
        })
       const createdUser= await User.findById(user._id).select("-password -refreshToken ");

       if(!createdUser)
         {
          throw new ApiError(400,"User creation failed");
         }

return res.status(201).json(new ApiResponse(201,createdUser,"User registered successfully"));

    });


export {registerUser};