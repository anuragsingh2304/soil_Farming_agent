

import express from 'express';
import Distributor from '../models/distributor.js';
import { isAdmin, protect } from '../protect.js';
import logger from '../logger.js';

const distributorRouter = express.Router();

// POST /api/distributor - Create new distributor
distributorRouter.post('/', protect ,isAdmin ,async (req, res) => {
  try {
    const distributor = new Distributor(req.body);
    await distributor.save();
    res.status(201).json(distributor);
    logger.info(`New distributor added successfully by ${req.user.email}`)
  } catch (error) {
    console.error('Create Distributor Error:', error.message);
    res.status(500).json({ message: 'Server error while creating distributor' });
    logger.error(`Error: failed to add new distributor by ${req.user.email}`)
  }
});

// GET /api/distributor - Get all distributors
distributorRouter.get('/', async (req, res) => {
  try {
    const distributors = await Distributor.find();
    res.status(200).json(distributors);
  } catch (error) {
    console.error('Get Distributors Error:', error.message);
    res.status(500).json({ message: 'Server error while getting distributors' });
  }
});

// GET /api/distributor/:id - Get single distributor by id
distributorRouter.get('/:id', async (req, res) => {
  try {
    const distributor = await Distributor.findById(req.params.id);
    if (!distributor) {
      return res.status(404).json({ message: 'Distributor not found' });
    }
    res.status(200).json(distributor);
  } catch (error) {
    console.error('Get Distributor Error:', error.message);
    res.status(500).json({ message: 'Server error while getting distributor' });
  }
});

// PUT /api/distributor/:id - Update distributor by id
distributorRouter.put('/:id', protect, isAdmin, async (req, res) => {
  try {
    const updatedDistributor = await Distributor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedDistributor) {
      logger.error(`Error: Distributor not found update failed by ${req.user.email}`)
      return res.status(404).json({ message: 'Distributor not found' });
    }
    res.status(200).json(updatedDistributor);
    logger.info(`Distributor with ID ${req.params.id} updated successfully by ${req.user.email}`)
  } catch (error) {
    console.error('Update Distributor Error:', error.message);
    res.status(500).json({ message: 'Server error while updating distributor' });
    logger.error(`Error: Distributor update failed for distributor ID ${req.params.id} by ${req.user.email}`)
  }
});

// DELETE /api/distributor/:id - Delete distributor by id
distributorRouter.delete('/:id',protect, isAdmin, async (req, res) => {
  try {
    const deletedDistributor = await Distributor.findByIdAndDelete(req.params.id);
    if (!deletedDistributor) {
      logger.info(`Distributor not found for ID ${req.params.id} deletion attempted by ${req.user.email}`)
      return res.status(404).json({ message: 'Distributor not found' });
    }
    res.status(200).json({ message: 'Distributor deleted successfully' });
    logger.info(`Distributor Deleted successfully by ${req.user.email}`)
  } catch (error) {
    console.error('Delete Distributor Error:', error.message);
    res.status(500).json({ message: 'Server error while deleting distributor' });
    logger.error(`Error: Distributor deletion failed attempted by ${req.user.email}`)
  }
});

export default distributorRouter;