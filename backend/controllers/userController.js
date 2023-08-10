import User from '../models/User.js'


export const createUser=async(req, res)=>{
  const newUser=  new User(req.body);
  try {
      const savedUser=await newUser.save();
      res.status(200).json({
          sucess:true,
          message:"Successfully created",
          data:savedUser
      })
  } catch (err) {
      res.status(500).json({
          sucess:false,
          message:"Failed to create"
      })
  }
}

// update User
export const updateUser=async(req, res)=>{
  const id=req.params.id;
  try {
      const updateUser=await User.findByIdAndUpdate(id, {
          $set: req.body,
      }, {new:true})
      res.status(200).json({
          sucess:true,
          message:"Successfully updated",
          data:updateUser
      })
  } catch (err) {
      res.status(500).json({
          sucess:false,
          message:"Failed to update"
      })
  }
}
// delete User
export const deleteUser=async(req, res)=>{
  const id=req.params.id;
  try {
      const deleteUser=await User.findByIdAndDelete(id)
      res.status(200).json({
          sucess:true,
          message:"Successfully deleted",
          data:deleteUser
      })
  } catch (err) {
      res.status(500).json({
          sucess:false,
          message:"Failed to delete"
      })
  }
}
// getSingle User
export const getSingleUser=async(req, res)=>{
  const id=req.params.id;
  try {
      const user=await User.findById(id)
      res.status(200).json({
          sucess:true,
          message:"Successfully",
          data:user
      })
  } catch (err) {
      res.status(404).json({
          sucess:false,
          message:"not found"
      })
  }
}
// getAll User
export const getAllUser=async(req, res)=>{
  
  try {
       const Users=await User.find({})
      res.status(200).json({
          sucess:true,
          message:"Successful",
          data:Users
      })
  } catch (err) {
      res.status(404).json({
          sucess:false,
          message:"not found"
      })
  }
}




