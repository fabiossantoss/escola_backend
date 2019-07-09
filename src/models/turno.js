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

module.exports = mongoose.model('Turno', Turnos);
