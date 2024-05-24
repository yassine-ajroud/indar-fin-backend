const SubCategory = require("../models/SubCategory");

const createSubCategory =async (req,res)=>{
    const newSubCategory = new SubCategory(req.body);
    try {
      const savedSubCategory = await newSubCategory.save();
      res.status(201).json(savedSubCategory);
    } catch (err) {
      res.status(500).json(err);
    }
  }
   
  const getSubCategoryById =async (req,res)=>{
    try {
        const subcategory = await SubCategory.findById(req.params.id);
        if (!subcategory) {
          return res.status(404).json({ error: 'subcategory not found.' });
        }
        res.status(200).json(subcategory);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch the subcategory.' });
      }
  }

  const getAllSubCategories =async (req,res)=>{
    try {
        const subcategories = await SubCategory.find({}); // Exclude the password field
        res.status(200).json(subcategories);
      } catch (error) {
        res.status(500).json({ message: 'Error occurred while fetching subcategories' });
      }
  }


  const updateSubCategory =async (req,res)=>{
    try {
        const subcategory = await SubCategory.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
        });
        if (!subcategory) {
          return res.status(404).json({ error: 'subcategory not found.' });
        }
        res.status(200).json(subcategory);
      } catch (error) {
        res.status(500).json({ error: 'Failed to update the subcategory.' });
      }
  }

  const deleteSubCategory =async (req,res)=>{
    try {
        const subcategory = await SubCategory.findOneAndDelete({"_id":req.params.id});
        if (!subcategory) {
          return res.status(404).json({ error: 'subcategory not found.' });
        }
        res.status(200).json({ message: 'subcategory deleted successfully.' });
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete the subcategory.' });
      }
  }

module.exports = {
    createSubCategory,getSubCategoryById,updateSubCategory,deleteSubCategory,getAllSubCategories
}