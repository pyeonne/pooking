import * as hotelRepository from '../data/hotel.js';

export async function getHotels(req, res) {
  const data = await hotelRepository.getAll();
  res.status(200).json(data);
}

export async function getHotel(req, res) {
  const id = req.params.id;
  const hotel = await hotelRepository.getById(id);
  if (hotel) {
    res.status(200).json(hotel);
  } else {
    res.status(404).json({ message: `Hotel id(${id}) not found` });
  }
}

export async function createHotel(req, res) {
  const hotel = await hotelRepository.create(req.body);
  res.status(201).json(hotel);
}

export async function updateHotel(req, res) {
  const id = req.params.id;
  const content = req.body;
  const hotel = await hotelRepository.getById(id);
  if (!hotel) {
    return res.sendStatus(404);
  }
  const updated = await hotelRepository.update(id, content);
  res.status(200).json(updated);
}

export async function deleteHotel(req, res) {
  const id = req.params.id;
  const hotel = await hotelRepository.getById(id);
  if (!hotel) {
    return res.sendStatus(404);
  }
  await hotelRepository.remove(id);
  res.sendStatus(204);
}
