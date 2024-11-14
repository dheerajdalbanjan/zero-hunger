import mongoose from "mongoose";



const DonationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  lastdate: {type:Date, required: true} ,
  date: { type: Date, default: Date.now }
});

export default mongoose.models.Donats || mongoose.model('Donats', DonationSchema);
