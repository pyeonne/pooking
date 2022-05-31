import Mongoose from 'mongoose';
import { useVirtualId } from '../database/database.js';

const hotelSchema = new Mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    distance: { type: String, required: true },
    photos: [String],
    title: { type: String, required: true },
    desc: { type: String, required: true },
    rating: { type: Number, min: 0, max: 5 },
    rooms: [String],
    cheapestPrice: { type: Number, required: true },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true },
);

useVirtualId(hotelSchema);

const Hotel = Mongoose.model('Hotel', hotelSchema);

export async function getAll() {
  return Hotel.find().sort({ createdAt: -1 });
}

export async function getById(id) {
  return Hotel.findById(id);
}

export async function create(hotel) {
  return new Hotel(hotel).save();
}

export async function update(id, content) {
  return Hotel.findByIdAndUpdate(id, { $set: content }, { new: true });
}

export async function remove(id) {
  return Hotel.findByIdAndDelete(id);
}

export async function pushRoom(id, room) {
  return Hotel.findByIdAndUpdate(id, { $push: { rooms: room.id } });
}

export async function pullRoom(id, room) {
  return Hotel.findByIdAndUpdate(id, { $pull: { rooms: room.id } });
}
