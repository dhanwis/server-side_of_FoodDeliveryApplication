const restaurantss = require("../Model/Restaurant");

// add restaurant
exports.addRestaurant=async(req,res)=>{
   
 const  resimage=req.file.filename
 console.log(resimage);

 const { resname,reslocation, resaddress, resphone,restime}=req.body
console.log(`${resname},${reslocation},${resaddress},${resphone},${restime}`);

try{
    const existingrestaurant= await restaurantss.findOne({resphone})
    if(existingrestaurant){
        res.status(406).json('restaurant already exists')
    }
    else{
        const newrestaurant=new restaurantss({
            resname,reslocation, resaddress, resphone,restime, resimage
        })
        await newrestaurant.save()
        res.status(200).json(newrestaurant)
    }

}catch(err){
    res.status(401).json(`request failed due to ${err}`)
}





 

}


// get restaurant
exports.getallRestaurant=async(req,res)=>{
 

    try{
        const Restaurant=await restaurantss.find()
        res.status(200).json(Restaurant)
    }
    catch(err){
        res.status(401).json(`request failed due to ${err}`)
    }
}

// edit restaurant
exports.editRestaurant=async(req,res)=>{
    const {id}=req.params
    // const userid=req.payload
    
    const { resname,reslocation, resaddress, resphone,restime,resimage}=req.body
    const uploadedrestaurantimage=req.file?req.file.filename:resimage

    try{
        const updateRestaurant=await restaurantss.findByIdAndUpdate({_id:id},{resname,reslocation,resaddress,resphone,restime,resimage:uploadedrestaurantimage},{new:true})

        await updateRestaurant.save()
        res.status(200).json(updateRestaurant)

    }catch(err){
        res.status(401).json(err)
    }

}

// delete restaurant

exports.deleterestaurant=async(req,res)=>{
    const {id}=req.params
    console.log(id);


try{
    const removerestaurant=await restaurantss.findByIdAndDelete({_id:id})
    res.status(200).json(removerestaurant)

}
catch(err){
    res.status(401).json(err)

}

} 



