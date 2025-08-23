const asyncHandler = (requestHandler) => {
    (req, res, next)=> {
        Promise.resolve(requestHandler(req, res, next))

        .catch((error) => next(err))

    }
}
            



export default asyncHandler;





// const asyncHandler = (fun) => async(req,res,next) => {

// try {

//     await fun(req,res,next); 
// }

// catch (error) {
//     res.status(err.code||500).json({
//         success: false,
//         message: error.message || "Internal Server Error",

//     })
// }