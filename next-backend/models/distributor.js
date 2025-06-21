import mongoose from 'mongoose';

const distributorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
    },
    supportedCrops: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Distributor = mongoose.model('Distributor', distributorSchema);

export default Distributor;