const boy = require("../Model/DeliveryBoy");




// add delivery boy

exports.addboyys=async(req,res)=>{
    console.log('inside project add controller');
   

 const {boyname,boylocation, boynumber}=req.body
console.log(`${boyname},${boylocation},${boynumber}`);

try{
    const existingdeliveryboy= await boy.findOne({boynumber})
    if(existingdeliveryboy){
        res.status(406).json('deliveryboy already exists')
    }
    else{
        const newproject=new boy({
            boyname,boylocation,boynumber
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
    
    const {boyname,boylocation,boynumber}=req.body
    console.log(req.body);



     try{
        const updateboy=await boy.findByIdAndUpdate({_id:id},{boyname,boylocation, boynumber},{new:true}) 
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


