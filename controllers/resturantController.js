const resturantModel = require("../models/resturantModel");

const createResturantController = async(req,res)=>{
    try{
        const {
            title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords,
        } = req.body;
        if(!title || !coords){
            return res.status(500).send({
                success:false,
                message:"please provide title and address",
            });
        } 
        const newResturant = new resturantModel({
            title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords,
        });

        await newResturant.save();

        res.status(200).send({
            success:true,
            message:"New Resturant Created Successfully",
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error In Create Resturant API",
            error,
        });
    }
};

const getAllResturantController = async(req,res)=>{
    try{
         const resturants = await resturantModel.find({});
         if(!resturants){
            return res.status(404).send({
                success:false,
                message:"No Resturant Availible",
            })
         }
         res.status(200).send({
            success:true,
            totalCount:resturants.length,
            resturants
         });
    }catch(error){
    console.log(error);
    res.status(500).send({
        success:false,
        message:"Error In Get All Resturant API",
        error,
    })
    }
}

const getResturantByIdController = async(req,res)=>{
    try{
        const resturantId = req.params.id;
        if(!resturantId){
            return res.status(500).send({
                success:false,
                message:"no resturant found",
            });
        }
        
        const resturant = await resturantModel.findById(resturantId);
        if(!resturant){
            return res.status(404).send({
                sucess:false,
                message:"no resturant found",
            });
        }
        res.status(200).send({
            sucess:true,
            resturant,
        });
    }catch(error){
      console.log(error);
      res.status(500).send({
        sucess:false,
        message:"Error In Get Resturant by ID API",
        error,
      });
    }
};


const deleteResturantController = async(req,res)=>{
    try {
        const resturantId = req.params.id;
        if(!resturantId){
            return res.status(404).send({
                sucess:false,
                message:"No Resturant Found or Provide Resturant ID",
            });
        }
        await resturantModel.findByIdAndDelete(resturantId);
        res.status(200).send({
            message:true,
            message:"Resturnat Deleted Sucessfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            sucess:false,
            message:"Error in Delete Resturant API",
            error,
        });
    }
}


module.exports = {
    createResturantController,
    getAllResturantController,
    getResturantByIdController,
    deleteResturantController,
}