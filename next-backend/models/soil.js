import mongoose from 'mongoose';

const soilSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      trim: true,
    },
    characteristics: {
      type: String,
      required: true,
    },
    suitableCrops: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    ph: {
      type: String,
      required: true,
    },
    nutrientContent: {
      type: String,
      required: true,
    },
    waterRetention: {
      type: String,
      required: true,
    },
    cultivation: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Soil = mongoose.model('Soil', soilSchema);

export default Soil;