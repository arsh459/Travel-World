  import Tour from '../models/Tour.js'


  export const createTour=async(req, res)=>{
    const newTour=  new Tour(req.body);
    try {
        const savedTour=await newTour.save();
        res.status(200).json({
            sucess:true,
            message:"Successfully created",
            data:savedTour
        })
    } catch (err) {
        res.status(500).json({
            sucess:false,
            message:"Failed to create"
        })
    }
  }

// update Tour
  export const updateTour=async(req, res)=>{
    const id=req.params.id;
    try {
        const updateTour=await Tour.findByIdAndUpdate(id, {
            $set: req.body,
        }, {new:true})
        res.status(200).json({
            sucess:true,
            message:"Successfully updated",
            data:updateTour
        })
    } catch (err) {
        res.status(500).json({
            sucess:false,
            message:"Failed to update"
        })
    }
  }
// delete Tour
  export const deleteTour=async(req, res)=>{
    const id=req.params.id;
    try {
        const deleteTour=await Tour.findByIdAndDelete(id)
        res.status(200).json({
            sucess:true,
            message:"Successfully deleted",
            data:deleteTour
        })
    } catch (err) {
        res.status(500).json({
            sucess:false,
            message:"Failed to delete"
        })
    }
  }
// getSingle Tour
  export const getSingleTour=async(req, res)=>{
    const id=req.params.id;
    try {
        const tour=await Tour.findById(id).populate("reviews")
        res.status(200).json({
            sucess:true,
            message:"Successfully",
            data:tour
        })
    } catch (err) {
        res.status(404).json({
            sucess:false,
            message:"not found"
        })
    }
  }
// getAll Tour
  export const getAllTour=async(req, res)=>{
    const page=parseInt(req.query?.page)
    // console.log(page)
    try {
         const tours=await Tour.find({}).populate("reviews").skip(page*8).limit(8)
        res.status(200).json({
            sucess:true,
            message:"Successful",
            count:tours.length,
            data:tours
        })
    } catch (err) {
        res.status(404).json({
            sucess:false,
            message:"not found"
        })
    }
  }

  export const getTourBySearch=async(req, res)=>{
    const city= new RegExp(req.query.city, "i")
    const distance=parseInt(req.query.distance)
    const maxGroupSize=parseInt(req.query.maxGroupSize)
    try {
      const tours=await Tour.find({city, distance:{$gte:distance}, maxGroupSize:{$gte:maxGroupSize}}).populate("reviews")
      res.status(200).json({
        sucess:true,
        message:"Successful",
        count:tours.length,
        data:tours
    })
    } catch (err) {
      res.status(404).json({
        sucess:false,
        message:"not found"
    })
    }
  }

// get featured Tour
export const getFeaturedTour=async(req, res)=>{
  try {
       const tours=await Tour.find({featured:true}).populate("reviews").limit(8)
      res.status(200).json({
          sucess:true,
          message:"Successful",
          count:tours.length,
          data:tours
      })
  } catch (err) {
      res.status(404).json({
          sucess:false,
          message:"not found"
      })
  }
}

export const getTourCount=async(req, res)=>{
  try {
    const tour= await Tour.estimatedDocumentCount()
    res.status(200).json({success:true, data:tour})
  } catch (err ) {
    res.status(500).json({success:false, message:"failed to fetch"})
  }
}



