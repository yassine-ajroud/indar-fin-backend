const ServiceCategory = require("../models/ServiceCategory");

const createServiceCategory =async (req,res)=>{
    const newServiceCategory = new ServiceCategory(req.body);
    try {
      const savedServiceCategory = await newServiceCategory.save();
      res.status(201).json(savedServiceCategory);
    } catch (err) {
      res.status(500).json(err);
    }
  }
   
  const getServiceCategoryById =async (req,res)=>{
    try {
        const serviceCategory = await ServiceCategory.findById(req.params.id);
        if (!serviceCategory) {
          return res.status(404).json({ error: 'category not found.' });
        }
        res.status(200).json(serviceCategory);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch the category.' });
      }
  }

  const getAllServiceCategories =async (req,res)=>{
    try {
        const serviceCategories = await ServiceCategory.find({}); // Exclude the password field
        res.status(200).json(serviceCategories);
      } catch (error) {
        res.status(500).json({ message: 'Error occurred while fetching categories' });
      }
  }


  const updateServiceCategory =async (req,res)=>{
    try {
        const serviceCategory = await ServiceCategory.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
        });
        if (!serviceCategory) {
          return res.status(404).json({ error: 'category not found.' });
        }
        res.status(200).json(serviceCategory);
      } catch (error) {
        res.status(500).json({ error: 'Failed to update the category.' });
      }
  }

  const deleteServiceCategory =async (req,res)=>{
    try {
        const serviceCategory = await ServiceCategory.findOneAndDelete({"_id":req.params.id});
        if (!serviceCategory) {
          return res.status(404).json({ error: 'category not found.' });
        }
        res.status(200).json({ message: 'category deleted successfully.' });
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete the category.' });
      }
  }

module.exports = {
    createServiceCategory,getServiceCategoryById,updateServiceCategory,deleteServiceCategory,getAllServiceCategories
}