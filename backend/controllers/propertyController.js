const Property = require('../models/Property');

// Get all properties
exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate('owner', 'name email');
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get property by ID
exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('owner', 'name email');
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create property
exports.createProperty = async (req, res) => {
  try {
    // Process uploaded images
    const imageUrls = [];
    if (req.files && req.files.length > 0) {
      req.files.forEach(file => {
        // Store the relative path that can be served by the static middleware
        imageUrls.push(`/uploads/${file.filename}`);
      });
    }

    // Add owner from authenticated user and images
    const propertyData = {
      ...req.body,
      owner: req.user.id,
      images: imageUrls,
    };

    const property = new Property(propertyData);
    const newProperty = await property.save();
    
    // Populate owner info before returning
    await newProperty.populate('owner', 'name email phone');
    
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update property
exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Check authorization - only owner or admin can update
    if (property.owner.toString() !== req.user.id && req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Không có quyền chỉnh sửa bất động sản này' });
    }

    // Process new uploaded images if any
    const imageUrls = [...property.images]; // Keep existing images
    if (req.files && req.files.length > 0) {
      req.files.forEach(file => {
        imageUrls.push(`/uploads/${file.filename}`);
      });
    }

    // Update property data
    Object.assign(property, req.body);
    property.images = imageUrls;
    property.updatedAt = Date.now();
    
    const updatedProperty = await property.save();
    await updatedProperty.populate('owner', 'name email');
    res.json(updatedProperty);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete property
exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Check authorization - only owner or admin can delete
    if (property.owner.toString() !== req.user.id && req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Không có quyền xóa bất động sản này' });
    }

    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
