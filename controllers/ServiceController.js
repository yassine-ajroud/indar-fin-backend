const Service = require("../models/Service");

const createService =async (req,res)=>{
    const newService = new Service(req.body);
    try {
      const savedService = await newService.save();
      res.status(201).json(savedService);
    } catch (err) {
      res.status(500).json(err);
    }
  }
   
  const getServiceById =async (req,res)=>{
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
          return res.status(404).json({ error: 'service not found.' });
        }
        res.status(200).json(service);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch the service.' });
      }
  }

  
  const getServiceByUserId =async (req,res)=>{
    try {
        const service = await Service.findOne({userId:req.params.id}); // Exclude the password field
        res.status(200).json(service);
      } catch (error) {
        res.status(500).json({ message: 'Error occurred while fetching service' });
      }
  }


  const getAllServices =async (req,res)=>{
    try {
        const services = await Service.find({service:req.params.id}); // Exclude the password field
        res.status(200).json(services);
      } catch (error) {
        res.status(500).json({ message: 'Error occurred while fetching service' });
      }
  }


  const updateService =async (req,res)=>{
    try {
        const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
        });
        if (!service) {
          return res.status(404).json({ error: 'service not found.' });
        }
        res.status(200).json(service);
      } catch (error) {
        res.status(500).json({ error: 'Failed to update the service.' });
      }
  }

  const deleteService =async (req,res)=>{
    try {
        const service = await Service.findOneAndDelete({"_id":req.params.id});
        if (!service) {
          return res.status(404).json({ error: 'service not found.' });
        }
        res.status(200).json({ message: 'service deleted successfully.' });
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete the service.' });
      }
  }

module.exports = {
    createService,getServiceById,updateService,deleteService,getAllServices,getServiceByUserId
}