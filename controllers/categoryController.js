const categoryModel = require("../models/categoryModel");

const createCatController = async(req,res)=>{
    try{
        const {title,imageUrl} = req.body;
        if(!title){
            return res.status(500).send({
                success:false,
                message:"Please provide category title or image",
            });
        }
        const newCategory = new categoryModel({title,imageUrl});
        await newCategory.save();
        res.status(201).send({
            success:true,
            message:"category created",
            newCategory,
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error In Create Cat API",
            error,
        });
    }
}


const getAllCatController = async(req,res)=>{
    try {
        const categories = await categoryModel.find({});
        if(!categories){
            return res.status(404).send({
                success:false,
                message:"No Categories found",
            });
        }
        res.status(200).send({
            success:true,
            totalCat:categories.length,
            categories,
        });
    } catch (error) {
        console.log(error)
            res.status(500).send({
                sucess:false,
                message:"Error in get All Category API",
                error,
            });
    }
};

const updateCatController  = async(req,res)=>{
    try{
        const {id} = req.params;
        const {title,imageUrl}=req.body;
        const updatedCategory = await categoryModel.findByIdAndUpdate(
            id,
            {title,imageUrl},
            {new:true}
        );
        if (!updatedCategory){
            return re.status(500).send({
                    success:false,
                    message:"No category Found",
                });
        }
        res.status(200).send({
            success:true,
            message:"Category Updated Sucessfully",
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error i update cat api",
            error,
        });
    }
};

const deleteCatController = async(req,res)=>{
    try{
      const {id} = req.params;
      if(!id){
        return res.status(500).send({
            success:false,
            message:"Please provide Category ID",
        })
      }
      await categoryModel.findByIdAndDelete(id);
      res.status(200).send({
        sucess:true,
        message:"category Deleted sucessfully",
      })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in Delete can API",
            error,
        });
    }
};

module.exports = {
    createCatController,
    getAllCatController,
    updateCatController,
    deleteCatController
}