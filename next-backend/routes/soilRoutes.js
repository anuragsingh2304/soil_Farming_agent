import express from 'express';
import Soil from '../models/soil.js';
import logger from '../logger.js'
import { isAdmin, protect } from '../protect.js';

const soilRouter = express.Router();

// POST /api/soil - Create new soil
soilRouter.post('/', protect, isAdmin, async (req, res) => {
  try {
    const soil = new Soil(req.body);
    console.log(req.body)
    await soil.save();
    res.status(201).json(soil);
    logger.info(`New soil created successfully by ${req.user.email}`)
  } catch (error) {
    console.error('Create Soil Error:', error.message);
    res.status(500).json({ message: 'Server error while creating soil' });
    logger.error(`Error: error occurred while creating new soil attempted by ${req.user.email}`)
  }
});

// GET /api/soil - Get all soils
soilRouter.get('/', async (req, res) => {
  try {
    const soils = await Soil.find();
    if (soils.length === 0) {
      return res.status(204).json({ message: "there are no soils to send." });
    }
    res.status(200).json(soils);
  } catch (error) {
    console.error('Get Soils Error:', error.message);
    res.status(500).json({ message: 'Server error while getting soils' });
  }
});

// GET /api/soil/:id - Get single soil by id
soilRouter.get('/:id', async (req, res) => {
  try {
    const soil = await Soil.findById(req.params.id);
    if (!soil) {
      return res.status(404).json({ message: 'Soil not found' });
    }
    res.status(200).json(soil);
  } catch (error) {
    console.error('Get Soil Error:', error.message);
    res.status(500).json({ message: 'Server error while getting soil' });
  }
});

// PUT /api/soil/:id - Update soil by id
soilRouter.put('/:id',protect, isAdmin, async (req, res) => {
  try {
    const updatedSoil = await Soil.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSoil) {
      logger.warn(`Soil not found update failed for soil ID ${req.params.id} attempted by ${req.user.email}`)
      return res.status(404).json({ message: 'Soil not found' });
    }
    res.status(200).json(updatedSoil);
    logger,info(`Soil updated successfull soil ID ${req.params.id} attempted by ${req.user.email}`)
  } catch (error) {
    console.error('Update Soil Error:', error.message);
    res.status(500).json({ message: 'Server error while updating soil' });
    logger.error(`Error: error occurred while updating soil attempted by ${req.user.email}`)
  }
});

// DELETE /api/soil/:id - Delete soil by id
soilRouter.delete('/:id', protect, isAdmin,  async (req, res) => {
  try {
    const deletedSoil = await Soil.findByIdAndDelete(req.params.id);
    if (!deletedSoil) {
      logger.warn(`soil deletion failed soild not found soilID ${req.params.id} attempted by ${req.user.email}`)
      return res.status(404).json({ message: 'Soil not found' });
    }
    res.status(200).json({ message: 'Soil deleted successfully' });
    logger.info(`Soil deleted successfully attempted by ${req.user.email}`)
  } catch (error) {
    console.error('Delete Soil Error:', error.message);
    res.status(500).json({ message: 'Server error while deleting soil' });
    logger.error(`Error: error occurred while deleting soil soilID ${req.params.id} attempted by ${req.user.email}`)
  }
});

export default soilRouter;