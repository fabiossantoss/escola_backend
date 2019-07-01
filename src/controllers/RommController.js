/* eslint-disable class-methods-use-this */
const Room = require('../models/room');

class RoomController {
  async index(req, res, next) {
    try {
      const rooms = await Room.find();

      return res.json(rooms);
    } catch (err) {
      return next(err);
    }
  }

  async show(req, res, next) {
    try {
      const room = Room.findById(req.params.id);

      return res.json(room);
    } catch (err) {
      return next(err);
    }
  }

  async store(req, res, next) {
    try {
      const { title } = req.body;

      if (await Room.findOne({ title })) {
        return res.status(400).json({ error: 'Sala já existe' });
      }

      const room = await Room.create(req.body);

      return res.json(room);
    } catch (err) {
      return next(err);
    }
  }

  async update(req, res, next) {
    try {
      const room = await Room.findById(req.params.id);
      if (!room) {
        return res.status(400).json('Sala não existe');
      }

      if (req.body.title) room.title = req.body.title;
      if (req.body.description) room.description = req.body.description;

      await room.save();

      return res.json(room);
    } catch (err) {
      return next(err);
    }
  }

  async destroy(req, res, next) {
    try {
      await Room.findByIdAndRemove(req.params.id);

      return res.send();
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = new RoomController();
