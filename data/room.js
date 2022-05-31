import Mongoose from 'mongoose';
import { useVirtualId } from '../database/database.js';

const roomSchema = new Mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    maxPeople: { type: Number, required: true },
    desc: { type: String, required: true },
    roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
  },
  { timestamps: true },
);

useVirtualId(roomSchema);

const Room = Mongoose.model('Room', roomSchema);

export async function getAll() {
  return Room.find().sort({ createdAt: -1 });
}

export async function getById(id) {
  return Room.findById(id);
}

export async function create(room) {
  return new Room(room).save();
}

export async function update(id, content) {
  return Room.findByIdAndUpdate(id, { $set: content }, { new: true });
}

export async function remove(id) {
  return Room.findByIdAndDelete(id);
}
