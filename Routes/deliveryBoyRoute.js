const express = require("express");


const deliveryboyController = require("../Controller/deliveryController");


const router=new express.Router()

router.post('/deliveryboys/adddeliveryboy',deliveryboyController.addboyys)



// get delivery boy
router.get('/deliveryboys/getboy',deliveryboyController.getdeliveryboy)


// update delivery boy
router.put('/deliveryboys/updateboy/:id',deliveryboyController.updatedeliveryboy)



// delete deliveryboy
router.delete('/deliveryboys/remove/:id',deliveryboyController.deletedeliveryboy)




module.exports=router















module.exports = router;
