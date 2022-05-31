import * as roomRepository from '../data/room.js';
import * as hotelRepository from '../data/hotel.js';

export async function getRooms(req, res) {
  const data = await roomRepository.getAll();
  res.status(200).json(data);
}

export async function getRoom(req, res) {
  const id = req.params.id;
  const room = await roomRepository.getById(id);
  if (room) {
    res.status(200).json(room);
  } else {
    res.status(404).json({ message: `Room id(${id}) not found` });
  }
}

export async function createRoom(req, res, next) {
  const hotelId = req.params.hotelid;
  const room = await roomRepository.create(req.body);
  const hotel = await hotelRepository.getById(hotelId);
  if (!hotel) {
    return res.status(404);
  }

  await hotelRepository.pushRoom(hotelId, room);

  res.status(200).json({ room: room, id: hotel.id });
}

export async function updateRoom(req, res, next) {
  const id = req.params.id;
  const content = req.body;
  const room = await roomRepository.getById(id);
  if (!room) {
    return res.sendStatus(404);
  }
  const updated = await roomRepository.update(id, content);
  res.status(200).json(updated);
}

export async function deleteRoom(req, res) {
  const hotelId = req.params.hotelid;
  const room = await roomRepository.remove(req.params.id);
  const hotel = await hotelRepository.getById(hotelId);
  if (!hotel) {
    return res.status(404);
  }

  await hotelRepository.pullRoom(hotelId, room);

  res.status(200).json('Room has been deleted.');
}
