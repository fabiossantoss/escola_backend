/* eslint-disable class-methods-use-this */
const Turno = require('../models/turno');

class TurnoController {
  async index(req, res, next) {
    try {
      const turnos = await Turno.find();

      return res.json(turnos);
    } catch (err) {
      return next(err);
    }
  }

  async show(req, res, next) {
    try {
      const turno = await Turno.findById(req.params.id);

      return res.json(turno);
    } catch (err) {
      return next(err);
    }
  }

  async store(req, res, next) {
    try {
      const { title } = req.body;

      if (await Turno.findOne({ title })) {
        return res.status(400).json({ error: 'Essa informaçao já está cadastrada!' });
      }

      const turno = await Turno.create(req.body);

      return res.json(turno);
    } catch (err) {
      return next(err);
    }
  }

  async update(req, res, next) {
    try {
      const turno = await Turno.findById(req.params.id);
      if (!turno) {
        return res.status(400).json('Informação não existe!');
      }

      if (req.body.title) turno.title = req.body.title;
      await turno.save();

      return res.json(turno);
    } catch (err) {
      return next(err);
    }
  }

  async destroy(req, res, next) {
    try {
      await Turno.findByIdAndRemove(req.params.id);

      return res.send();
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = new TurnoController();
