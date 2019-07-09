/* eslint-disable class-methods-use-this */
const Segment = require('../models/segment');

class SegmentController {
  async index(req, res, next) {
    try {
      const segments = await Segment.find();

      return res.json(segments);
    } catch (err) {
      return next(err);
    }
  }

  async show(req, res, next) {
    try {
      const segment = await Segment.findById(req.params.id);

      return res.json(segment);
    } catch (err) {
      return next(err);
    }
  }

  async store(req, res, next) {
    try {
      const { title } = req.body;

      if (await Segment.findOne({ title })) {
        return res.status(400).json({ error: 'Essa informaçao já está cadastrada!' });
      }

      const segment = await Segment.create(req.body);

      return res.json(segment);
    } catch (err) {
      return next(err);
    }
  }

  async update(req, res, next) {
    try {
      const segment = await Segment.findById(req.params.id);
      if (!segment) {
        return res.status(400).json('Informação não existe!');
      }

      if (req.body.title) segment.title = req.body.title;
      await segment.save();

      return res.json(segment);
    } catch (err) {
      return next(err);
    }
  }

  async destroy(req, res, next) {
    try {
      await Segment.findByIdAndRemove(req.params.id);

      return res.send();
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = new SegmentController();
