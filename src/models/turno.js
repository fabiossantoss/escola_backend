const mongoose = require('mongoose');

const Turnos = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = new mongoose.model('Turno', Turnos);
