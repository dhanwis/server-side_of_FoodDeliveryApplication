const boy = require("../Model/DeliveryBoy");




// add delivery boy

exports.addboyys=async(req,res)=>{
    console.log('inside project add controller');

    const  devimage=req.file.filename
 console.log(devimage);
   

 const {boyname,boylocation, boynumber}=req.body
console.log(`${boyname},${boylocation},${boynumber}`);

try{
    const existingdeliveryboy= await boy.findOne({boynumber})
    if(existingdeliveryboy){
        res.status(406).json('deliveryboy already exists')
    }
    else{
        const newproject=new boy({
            boyname,boylocation,boynumber,devimage,
            status:"active"
        })
        await newproject.save()
        res.status(200).json(newproject)
    }

}catch(err){
    res.status(401).json(`resquest failer due to ${err}`)
}








 

}

// get deliveryboy


exports.getdeliveryboy=async(req,res)=>{
 

    try{
        const seedeliveryboy=await boy.find()
        res.status(200).json(seedeliveryboy)
    }
    catch(err){
        res.status(401).json(`request failed due to ${err}`)
    }
}



// edit delivery boy
exports.updatedeliveryboy=async(req,res)=>{
    
    const {id}=req.params
    console.log(id);
    
    const {boyname,boylocation,boynumber,devimage}=req.body
    const uploadeddeliveryimage=req.file?req.file.filename:devimage

    console.log(req.body);




     try{
        const updateboy=await boy.findByIdAndUpdate({_id:id},{boyname,boylocation, boynumber,devimage:uploadeddeliveryimage},{new:true}) 
        await updateboy.save()
        res.status(200).json(updateboy)

     }
     catch(err){
        res.status(401,"error found").json(err)

     }

}







//delete deliveryboy
exports.deletedeliveryboy=async(req,res)=>{
    const {id}=req.params
    console.log(id);


try{
    const removedeliveryboy=await boy.findByIdAndDelete({_id:id})
    res.status(200).json(removedeliveryboy)

}
catch(err){
    res.status(401).json(err)

}

} 




//block deliveryboy 


exports.blockDeliveryboy = async (req, res) => {
    try {
      const deliveryboyId = req.params.id;
  
      // Hey new dev, are you here to edit this ? read it before;
      // Update the franchise status to "blocked" in the database
      // This step depends on how your database is structured and how you manage franchise status
      // For example, if you have a field called "status" in your Franchise model, you would update it accordingly
      // Here, I'll assume you're using Mongoose for MongoDB and have a Franchise model
      const updatedDeliveryBoy = await boy.findByIdAndUpdate(
        deliveryboyId,
        {
          status: "blocked",
        },
        // Using { new: true } ensure the updatedData contains the document after the update operation is applied.
        { new: true }
      );
  
      if (!updatedDeliveryBoy) {
        return res.status(404).json({ message: "DeliveryBoy not found to block" });
      }
  
      // Send a success response to the client
      res.status(200).json({
        message: `Deliveryboy ${updatedDeliveryBoy.boyname} blocked successfully`,
        DeliveryboyStatus: updatedDeliveryBoy.status,
      });
    } catch (error) {
      // Handle any errors that occur during the operation
      console.error("Error blocking Deliveryboy:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  exports.unblockDeliveryboy = async (req, res) => {
    try {
      const deliveryboyId = req.params.id;
      const updatedDeliveryBoy = await boy.findByIdAndUpdate(
        deliveryboyId,
        {
          status: "active", // Assuming "active" is the status for an unblocked franchise
        },
        { new: true }
      );
  
      if (!updatedDeliveryBoy) {
        return res
          .status(404)
          .json({ message: "DeliveryBoy not found to unblock" });
      }
  
      // Send a success response to the client
      res.status(200).json({
        message: `Deliveryoy ${updatedDeliveryBoy.boyname} unblocked successfully`,
        DeliveryboyStatus: updatedDeliveryBoy.status,
      });
    } catch (error) {
      // Handle any errors that occur during the operation
      console.error("Error unblocking DeliveryBoy:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  // module.exports={
  //   blockDeliveryboy,
  //   unblockDeliveryboy
  // }


  





