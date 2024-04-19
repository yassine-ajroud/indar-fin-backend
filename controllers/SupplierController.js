const Supplier = require('../models/supplier');

// Create a new Fournisseur
exports.createSupplier = async (req, res) => {
  try {
    const supplier = new Supplier(req.body);
    await supplier.save();
    res.status(201).json(supplier);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create the supplier.' });
  }
};

// Get all Fournisseurs
exports.getAllSuppliers = async (req, res) => {
  try {
    const supplier = await Supplier.find();
    res.status(200).json(supplier);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch supplier.' });
  }
};

// Get a single Fournisseur by ID
exports.getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ error: 'supplier not found.' });
    }
    res.status(200).json(supplier);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch the supplier.' });
  }
};

// Update a Fournisseur
exports.updateSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (!supplier) {
      return res.status(404).json({ error: 'supplier not found.' });
    }
    res.status(200).json(supplier);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the supplier.' });
  }
};

// Delete a Fournisseur
exports.deleteSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndDelete(req.params.id);
    if (!supplier) {
      return res.status(404).json({ error: 'supplier not found.' });
    }
    res.status(200).json({ message: 'supplier deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the supplier.' });
  }
};
